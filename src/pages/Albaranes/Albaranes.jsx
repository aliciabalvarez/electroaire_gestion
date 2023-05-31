import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
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
import {
	ModalContainer,
	ModalContentClients,
	CloseButton,
	StyledFormComponent,
	StyledFormInput,
	StyledFormTextarea,
	StyledFormSelect,
	StyledSave,
	StyledForm,
	StyledTitleForm,
	StyledContainer,
	StyledTitle,
	StyledNewTask,
	StyledTarjetaMenu,
	StyledPTarjetaMenu,
	StyledButtonTarjetaEditar,
	StyledButtonTarjetaEliminar,
	StyledPTarjetaMenuBig,
	StyledButtonTarjetaPDF,
	StyledMenuHome,
	StyledPMenuHome,
	StyledPMenuHomeBig
} from './styles.js';

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
			setNumeroAlbaran(albaran.id);
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

		const fontSize = 12;
		const pageWidth = page.getWidth();
		const pageHeight = page.getHeight();
		const margin = 50;

		const headerText = 'Albarán';
		const albaranData = [
			{ label: 'Número de Albarán', value: albaran.id },
			{ label: 'Fecha', value: albaran.fecha },
			{ label: 'Cliente', value: albaran.cliente },
			{ label: 'Vehículo', value: albaran.vehiculo },
			{ label: 'Descripción', value: albaran.servicios },
			{ label: 'Coste total', value: albaran.coste },
			{ label: 'Forma de pago', value: albaran.pago }
		];

		const firmaText = 'Firma: _______________________';

		// Estilos
		const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
		const textColor = rgb(0, 0, 0);

		// Encabezado
		page.drawText(headerText, {
			x: margin,
			y: pageHeight - margin,
			size: fontSize + 6,
			font,
			color: textColor,
			opacity: 0.75
		});

		// Datos del albarán
		let y = pageHeight - margin - (fontSize + 6) - 10;
		albaranData.forEach(({ label, value }) => {
			y -= fontSize + 2;
			page.drawText(`${label}: ${value}`, {
				x: margin,
				y,
				size: fontSize,
				font,
				color: textColor
			});
		});

		// Firma
		y -= 30;
		page.drawText(firmaText, {
			x: margin,
			y,
			size: fontSize,
			font,
			color: textColor
		});

		// Generar el PDF como ArrayBuffer
		const pdfBytes = await pdfDoc.save();
		const nombreArchivo = `albaran_${albaran.id}.pdf`;
		download(pdfBytes, nombreArchivo, 'application/pdf');
	};

	return (
		<div>
			<StyledContainer>
				<div>
					<StyledTitle>Listado de Albaranes de Clientes</StyledTitle>
				</div>
				<StyledNewTask to='#' onClick={() => setModalOpen(true)}>
					Nuevo Albarán
				</StyledNewTask>
			</StyledContainer>

			{modalOpen && (
				<Modal
					isOpen={true}
					onRequestClose={() => setModalOpen(false)}
					className='custom-modal'
					overlayClassName='custom-overlay'
				>
					<StyledTitleForm>
						{editingAlbaranId ? 'Editar Albarán' : 'Nuevo Albarán'}
					</StyledTitleForm>
					<StyledForm onSubmit={handleSubmit}>
						<StyledFormComponent>
							<StyledFormInput
								type='text'
								value={filtroClientes}
								onChange={event => setFiltroClientes(event.target.value)}
								placeholder='Buscar cliente'
							/>
							<StyledFormSelect
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
							</StyledFormSelect>
						</StyledFormComponent>

						<StyledFormComponent>
							<StyledFormInput
								placeholder='Fecha del Albarán'
								type='date'
								value={fechaAlbaran}
								onChange={handleFechaAlbaranChange}
							/>
						</StyledFormComponent>
						<StyledFormComponent>
							<StyledFormInput
								placeholder='Vehículo'
								type='text'
								value={vehiculo}
								onChange={handleVehiculoChange}
							/>
						</StyledFormComponent>
						<StyledFormComponent>
							<StyledFormInput
								placeholder='Descripción de Servicios'
								type='text'
								value={descripcionServicios}
								onChange={handleDescripcionServiciosChange}
							/>
						</StyledFormComponent>
						<StyledFormComponent>
							<StyledFormInput
								placeholder='Coste total'
								type='text'
								value={costeTotal}
								onChange={handleCosteTotalChange}
							/>
						</StyledFormComponent>
						<StyledFormComponent>
							<StyledFormInput
								placeholder='Forma de pago'
								type='text'
								value={formaPago}
								onChange={handleFormaPagoChange}
							/>
						</StyledFormComponent>
						<StyledSave
							type='submit'
							value={editingAlbaranId ? 'Guardar' : 'Agregar'}
						/>

						<CloseButton onClick={() => setModalOpen(false)}>
							<FontAwesomeIcon icon={faXmark} />
						</CloseButton>
					</StyledForm>
				</Modal>
			)}
			<StyledMenuHome>
				<StyledPMenuHomeBig>ID de Albarán</StyledPMenuHomeBig>
				<StyledPMenuHome>Nombre</StyledPMenuHome>
				<StyledPMenuHomeBig>Fecha albarán</StyledPMenuHomeBig>
				<StyledPMenuHome>Vehículo</StyledPMenuHome>
				<StyledPMenuHomeBig>Descripción</StyledPMenuHomeBig>
				<StyledPMenuHome>Coste total</StyledPMenuHome>
				<StyledPMenuHomeBig>Método de pago</StyledPMenuHomeBig>
			</StyledMenuHome>
			<div>
				{albaranes.map(albaran => (
					<StyledTarjetaMenu key={albaran.id} className='albaran-module'>
						<StyledPTarjetaMenuBig>{albaran.id}</StyledPTarjetaMenuBig>
						<StyledPTarjetaMenu>{albaran.cliente}</StyledPTarjetaMenu>
						<StyledPTarjetaMenuBig>{albaran.fecha}</StyledPTarjetaMenuBig>
						<StyledPTarjetaMenu>{albaran.vehiculo}</StyledPTarjetaMenu>
						<StyledPTarjetaMenuBig>{albaran.servicios}</StyledPTarjetaMenuBig>
						<StyledPTarjetaMenu>{albaran.coste}</StyledPTarjetaMenu>
						<StyledPTarjetaMenuBig>{albaran.pago}</StyledPTarjetaMenuBig>
						<StyledButtonTarjetaEditar
							onClick={() => handleEditarAlbaran(albaran.id)}
						>
							<FontAwesomeIcon icon={faPenToSquare} />
						</StyledButtonTarjetaEditar>
						<StyledButtonTarjetaEliminar
							onClick={() => handleEliminarAlbaran(albaran.id)}
						>
							<FontAwesomeIcon icon={faXmark} />
						</StyledButtonTarjetaEliminar>

						<StyledButtonTarjetaPDF onClick={() => generarPDF(albaran)}>
							PDF
						</StyledButtonTarjetaPDF>
					</StyledTarjetaMenu>
				))}
			</div>
		</div>
	);
}

export default AlbaranesCliente;
