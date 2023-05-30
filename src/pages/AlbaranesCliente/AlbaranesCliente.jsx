import { useState, useEffect } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import download from 'downloadjs';
import {
	collection,
	query,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
	updateDoc
} from 'firebase/firestore';
import { db, clientesCollectionReference } from '../../config/firebase.config';
import Modal from 'react-modal';

function AlbaranesCliente() {
	const [clientes, setClientes] = useState([]);
	const [clienteSeleccionado, setClienteSeleccionado] = useState('');
	const [numeroAlbaran, setNumeroAlbaran] = useState('');
	const [fechaAlbaran, setFechaAlbaran] = useState('');
	const [vehiculo, setVehiculo] = useState('');
	const [descripcionServicios, setDescripcionServicios] = useState('');
	const [costeTotal, setCosteTotal] = useState('');
	const [formaPago, setFormaPago] = useState('');
	const [albaranes, setAlbaranes] = useState([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [editingAlbaranId, setEditingAlbaranId] = useState(null);

	const [filtroClientes, setFiltroClientes] = useState('');

	const obtenerClientes = async () => {
		const clientesRef = clientesCollectionReference;
		const clientesSnapshot = await getDocs(clientesRef);
		const nombresClientes = clientesSnapshot.docs.map(doc => doc.data().nombre);
		setClientes(nombresClientes);
	};

	useEffect(() => {
		obtenerClientes();
	}, []);

	useEffect(() => {
		const obtenerAlbaranes = async () => {
			const albaranesRef = collection(db, 'albaranes');
			const albaranesSnapshot = await getDocs(albaranesRef);
			const albaranesData = albaranesSnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setAlbaranes(albaranesData);
		};

		obtenerAlbaranes();
	}, []);

	const handleClienteChange = event => {
		setClienteSeleccionado(event.target.value);
	};

	const handleNumeroAlbaranChange = event => {
		setNumeroAlbaran(event.target.value);
	};

	const handleFechaAlbaranChange = event => {
		setFechaAlbaran(event.target.value);
	};

	const handleVehiculoChange = event => {
		setVehiculo(event.target.value);
	};

	const handleDescripcionServiciosChange = event => {
		setDescripcionServicios(event.target.value);
	};

	const handleCosteTotalChange = event => {
		setCosteTotal(event.target.value);
	};

	const handleFormaPagoChange = event => {
		setFormaPago(event.target.value);
	};

	const handleSubmit = async event => {
		event.preventDefault();

		if (editingAlbaranId) {
			// Editar albarán existente
			const albaranRef = doc(db, 'albaranes', editingAlbaranId);
			const albaranActualizado = {
				cliente: clienteSeleccionado,
				numero: numeroAlbaran,
				fecha: fechaAlbaran,
				vehiculo: vehiculo,
				servicios: descripcionServicios,
				coste: costeTotal,
				pago: formaPago
			};

			try {
				await updateDoc(albaranRef, albaranActualizado);
				console.log('Albarán actualizado correctamente');

				const albaranesActualizados = albaranes.map(albaran =>
					albaran.id === editingAlbaranId
						? { id: editingAlbaranId, ...albaranActualizado }
						: albaran
				);

				setAlbaranes(albaranesActualizados);
			} catch (error) {
				console.error('Error al actualizar el albarán', error);
			}
		} else {
			// Agregar nuevo albarán
			const albaran = {
				cliente: clienteSeleccionado,
				numero: numeroAlbaran,
				fecha: fechaAlbaran,
				vehiculo: vehiculo,
				servicios: descripcionServicios,
				coste: costeTotal,
				pago: formaPago
			};

			try {
				const albaranRef = await addDoc(collection(db, 'albaranes'), albaran);

				const nuevoAlbaran = {
					id: albaranRef.id,
					...albaran
				};

				setAlbaranes([...albaranes, nuevoAlbaran]);
				console.log('Albarán agregado correctamente');
			} catch (error) {
				console.error('Error al agregar el albarán', error);
			}
		}

		setClienteSeleccionado('');
		setNumeroAlbaran('');
		setFechaAlbaran('');
		setVehiculo('');
		setDescripcionServicios('');
		setCosteTotal('');
		setFormaPago('');
		setModalOpen(false);
		setEditingAlbaranId(null);
	};

	const handleEditarAlbaran = albaranId => {
		const albaran = albaranes.find(albaran => albaran.id === albaranId);

		if (albaran) {
			setClienteSeleccionado(albaran.cliente);
			setNumeroAlbaran(albaran.numero);
			setFechaAlbaran(albaran.fecha);
			setVehiculo(albaran.vehiculo);
			setDescripcionServicios(albaran.servicios);
			setCosteTotal(albaran.coste);
			setFormaPago(albaran.pago);
			setEditingAlbaranId(albaranId);
			setModalOpen(true);
		}
	};

	const handleEliminarAlbaran = async albaranId => {
		try {
			const albaranRef = doc(db, 'albaranes', albaranId);
			await deleteDoc(albaranRef);
			console.log('Albarán eliminado correctamente');

			const nuevosAlbaranes = albaranes.filter(
				albaran => albaran.id !== albaranId
			);
			setAlbaranes(nuevosAlbaranes);
		} catch (error) {
			console.error('Error al eliminar el albarán', error);
		}
	};

	const generarPDF = async albaran => {
		const pdfDoc = await PDFDocument.create();
		const page = pdfDoc.addPage();

		const { width, height } = page.getSize();

		page.drawText('Albarán', {
			x: 50,
			y: height - 50,
			size: 18,
			font: await pdfDoc.embedFont(StandardFonts.Helvetica),
			color: rgb(0, 0, 0)
		});

		page.drawText('Cliente:', {
			x: 50,
			y: height - 80,
			size: 12,
			font: await pdfDoc.embedFont(StandardFonts.Helvetica),
			color: rgb(0, 0, 0)
		});

		page.drawText(albaran.cliente, {
			x: 120,
			y: height - 80,
			size: 12,
			font: await pdfDoc.embedFont(StandardFonts.Helvetica),
			color: rgb(0, 0, 0)
		});

		// Agregar más campos del albarán según sea necesario
		// Utiliza los componentes TitleText, Text y otros definidos en styles.js

		const pdfBytes = await pdfDoc.save();

		// Descargar el PDF utilizando la biblioteca 'downloadjs'
		download(pdfBytes, 'albaran.pdf', 'application/pdf');
	};

	return (
		<div>
			<h2>Albaranes cliente</h2>
			<button onClick={() => setModalOpen(true)}>Agregar Albarán</button>
			{modalOpen && (
				<Modal isOpen={true} onRequestClose={() => setModalOpen(false)}>
					<h3>{editingAlbaranId ? 'Editar Albarán' : 'Agregar Albarán'}</h3>
					<form onSubmit={handleSubmit}>
						<div>
							<label>Cliente:</label>

							<input
								type='text'
								value={filtroClientes}
								onChange={event => setFiltroClientes(event.target.value)}
								placeholder='Buscar cliente'
							/>
							<select
								value={clienteSeleccionado}
								onChange={handleClienteChange}
							>
								<option value=''>Seleccione un cliente</option>
								{clientes
									.filter(cliente => cliente.includes(filtroClientes))
									.map((cliente, index) => (
										<option key={index} value={cliente}>
											{cliente}
										</option>
									))}
							</select>
						</div>
						<div>
							<label>Número de Albarán:</label>
							<input
								type='text'
								value={numeroAlbaran}
								onChange={handleNumeroAlbaranChange}
							/>
						</div>
						<div>
							<label>Fecha de Albarán:</label>
							<input
								type='text'
								value={fechaAlbaran}
								onChange={handleFechaAlbaranChange}
							/>
						</div>
						<div>
							<label>Vehículo:</label>
							<input
								type='text'
								value={vehiculo}
								onChange={handleVehiculoChange}
							/>
						</div>
						<div>
							<label>Descripción de Servicios:</label>
							<input
								type='text'
								value={descripcionServicios}
								onChange={handleDescripcionServiciosChange}
							/>
						</div>
						<div>
							<label>Coste Total:</label>
							<input
								type='text'
								value={costeTotal}
								onChange={handleCosteTotalChange}
							/>
						</div>
						<div>
							<label>Forma de Pago:</label>
							<input
								type='text'
								value={formaPago}
								onChange={handleFormaPagoChange}
							/>
						</div>
						<button type='submit'>
							{editingAlbaranId ? 'Guardar Cambios' : 'Agregar'}
						</button>
						<button onClick={() => setModalOpen(false)}>Cancelar</button>
					</form>
				</Modal>
			)}
			<div>
				<h3>Albaranes creados:</h3>
				{albaranes.map(albaran => (
					<div key={albaran.id} className='albaran-module'>
						<p>Id de Albarán: {albaran.id}</p>
						<p>Cliente: {albaran.cliente}</p>
						<p>Fecha de Albarán: {albaran.fecha}</p>
						<p>Vehículo: {albaran.vehiculo}</p>
						<p>Descripción de Servicios: {albaran.servicios}</p>
						<p>Coste Total: {albaran.coste}</p>
						<p>Forma de Pago: {albaran.pago}</p>
						<button onClick={() => handleEditarAlbaran(albaran.id)}>
							Editar
						</button>
						<button onClick={() => handleEliminarAlbaran(albaran.id)}>
							Eliminar
						</button>

						<button onClick={() => generarPDF(albaran)}>Descargar PDF</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default AlbaranesCliente;
