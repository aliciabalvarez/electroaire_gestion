import React, { useState, useEffect } from 'react';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc
} from 'firebase/firestore';
import { clientesCollectionReference } from '../../config/firebase.config';
import Modal from 'react-modal';
import { ModalContainer, ModalContent, CloseButton } from './styles';

function Clientes() {
	const [showModal, setShowModal] = useState(false);
	const [clientes, setClientes] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	function abrirModal() {
		setShowModal(true);
	}

	function cerrarModal() {
		setShowModal(false);
	}

	const [showEditModal, setShowEditModal] = useState(false);
	const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
	const [nombreEdit, setNombreEdit] = useState('');
	const [emailEdit, setEmailEdit] = useState('');
	const [telefonoEdit, setTelefonoEdit] = useState('');
	const [vehiculoEdit, setVehiculoEdit] = useState('');
	const [numeroPlacaEdit, setNumeroPlacaEdit] = useState('');
	const [ultimoServicioEdit, setUltimoServicioEdit] = useState('');
	const [fechaIngresoEdit, setFechaIngresoEdit] = useState('');
	const [estadoCuentaEdit, setEstadoCuentaEdit] = useState('');
	const [observacionesEdit, setObservacionesEdit] = useState('');

	function abrirModalEdicion(cliente) {
		setClienteSeleccionado(cliente);
		setNombreEdit(cliente.nombre);
		setEmailEdit(cliente.email);
		setTelefonoEdit(cliente.telefono);
		setVehiculoEdit(cliente.vehiculo);
		setNumeroPlacaEdit(cliente.numeroPlaca);
		setUltimoServicioEdit(cliente.ultimoServicio);
		setFechaIngresoEdit(cliente.fechaIngreso);
		setEstadoCuentaEdit(cliente.estadoCuenta);
		setObservacionesEdit(cliente.observaciones);
		setShowEditModal(true);
	}

	function cerrarModalEdicion() {
		setShowEditModal(false);
	}
	useEffect(() => {
		const obtenerClientes = async () => {
			try {
				const querySnapshot = await getDocs(clientesCollectionReference);
				const clientes = querySnapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}));
				setClientes(clientes);
			} catch (error) {
				console.error('Error al obtener los clientes:', error);
			}
		};

		obtenerClientes();
	}, []);

	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [telefono, setTelefono] = useState('');
	const [vehiculo, setVehiculo] = useState('');
	const [numeroPlaca, setNumeroPlaca] = useState('');
	const [ultimoServicio, setUltimoServicio] = useState('');
	const [fechaIngreso, setFechaIngreso] = useState('');
	const [estadoCuenta, setEstadoCuenta] = useState('');
	const [observaciones, setObservaciones] = useState('');

	const handleNombreEditChange = event => {
		setNombreEdit(event.target.value);
	};

	const handleEmailEditChange = event => {
		setEmailEdit(event.target.value);
	};

	const handleTelefonoEditChange = event => {
		setTelefonoEdit(event.target.value);
	};

	const handleVehiculoEditChange = event => {
		setVehiculoEdit(event.target.value);
	};
	const handleNumeroPlacaEditChange = event => {
		setNumeroPlacaEdit(event.target.value);
	};

	const handleUltimoServicioEditChange = event => {
		setUltimoServicioEdit(event.target.value);
	};

	const handleFechaIngresoEditChange = event => {
		setFechaIngresoEdit(event.target.value);
	};

	const handleEstadoCuentaEditChange = event => {
		setEstadoCuentaEdit(event.target.value);
	};

	const handleObservacionesEditChange = event => {
		setObservacionesEdit(event.target.value);
	};

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			const clienteData = {
				nombre: nombre,
				email: email,
				telefono: telefono,
				vehiculo: vehiculo,
				numeroPlaca: numeroPlaca,
				ultimoServicio: ultimoServicio,
				fechaIngreso: fechaIngreso,
				estadoCuenta: estadoCuenta,
				observaciones: observaciones
			};

			// Inserta los datos del cliente en la colección de clientes
			const docRef = await addDoc(clientesCollectionReference, clienteData);
			console.log('Cliente agregado con ID:', docRef.id);

			// Actualiza la lista de clientes con el nuevo cliente agregado
			setClientes(prevClientes => [
				...prevClientes,
				{ id: docRef.id, ...clienteData }
			]);

			// Limpia los campos del formulario después de la inserción
			setNombre('');
			setEmail('');
			setTelefono('');
			setVehiculo('');
			setNumeroPlaca('');
			setUltimoServicio('');
			setFechaIngreso('');
			setEstadoCuenta('');
			setObservaciones('');

			// Cierra el modal después de agregar el cliente
			cerrarModal();
		} catch (error) {
			console.error('Error al agregar el cliente:', error);
		}
	};
	const handleDelete = async clientId => {
		try {
			// Elimina el cliente de la colección
			await deleteDoc(doc(clientesCollectionReference, clientId));
			console.log('Cliente eliminado:', clientId);

			// Actualiza la lista de clientes eliminando el cliente eliminado
			setClientes(prevClientes =>
				prevClientes.filter(cliente => cliente.id !== clientId)
			);
		} catch (error) {
			console.error('Error al eliminar el cliente:', error);
		}
	};
	const handleEditSubmit = async event => {
		event.preventDefault();

		try {
			const clienteData = {
				nombre: nombreEdit,
				email: emailEdit,
				telefono: telefonoEdit,
				vehiculo: vehiculoEdit,
				numeroPlaca: numeroPlacaEdit,
				ultimoServicio: ultimoServicioEdit,
				fechaIngreso: fechaIngresoEdit,
				estadoCuenta: estadoCuentaEdit,
				observaciones: observacionesEdit
			};

			// Actualiza los datos del cliente en la base de datos
			await updateDoc(
				doc(clientesCollectionReference, clienteSeleccionado.id),
				clienteData
			);
			console.log('Cliente actualizado:', clienteSeleccionado.id);

			// Actualiza la lista de clientes con el cliente editado
			setClientes(prevClientes =>
				prevClientes.map(cliente =>
					cliente.id === clienteSeleccionado.id
						? { id: cliente.id, ...clienteData }
						: cliente
				)
			);

			// Cierra el modal de edición después de guardar los cambios
			cerrarModalEdicion();
		} catch (error) {
			console.error('Error al editar el cliente:', error);
		}
	};
	const handleSearchChange = event => {
		const value = event.target.value || ''; // Manejar el caso de valor undefined
		setSearchTerm(value);
	};

	const filteredClientes = clientes.filter(cliente => {
		const searchTermLower = searchTerm.toLowerCase();
		return (
			cliente.nombre.toLowerCase().includes(searchTermLower) ||
			cliente.email.toLowerCase().includes(searchTermLower) ||
			cliente.telefono.toLowerCase().includes(searchTermLower) ||
			cliente.vehiculo.toLowerCase().includes(searchTermLower) ||
			cliente.numeroPlaca.toLowerCase().includes(searchTermLower) ||
			cliente.ultimoServicio.toLowerCase().includes(searchTermLower) ||
			cliente.fechaIngreso.toLowerCase().includes(searchTermLower) ||
			cliente.estadoCuenta.toLowerCase().includes(searchTermLower) ||
			cliente.observaciones.toLowerCase().includes(searchTermLower)
		);
	});

	return (
		<div>
			<h2>Lista de Clientes</h2>
			<input
				type='text'
				placeholder='Buscar por categoría'
				value={searchTerm}
				onChange={handleSearchChange}
			/>
			<button onClick={abrirModal}>NUEVO CLIENTE</button>

			{filteredClientes.map(cliente => (
				<div key={cliente.id}>
					<h3>{cliente.nombre}</h3>
					<p>Email: {cliente.email}</p>
					<p>Teléfono: {cliente.telefono}</p>
					<p>Vehículo: {cliente.vehiculo}</p>
					<p>Número de Placa: {cliente.numeroPlaca}</p>
					<p>Último Servicio: {cliente.ultimoServicio}</p>
					<p>Fecha de Ingreso: {cliente.fechaIngreso}</p>
					<p>Estado de Cuenta: {cliente.estadoCuenta}</p>
					<p>Observaciones: {cliente.observaciones}</p>
					<button onClick={() => cliente.id && abrirModalEdicion(cliente)}>
						Editar
					</button>
					<button onClick={() => handleDelete(cliente.id)}>Eliminar</button>
				</div>
			))}

			{showEditModal && clienteSeleccionado && (
				<ModalContainer>
					<ModalContent>
						<CloseButton onClick={cerrarModalEdicion}>&times;</CloseButton>
						<h2>Editar cliente</h2>
						<form onSubmit={handleEditSubmit}>
							<div>
								<label>Nombre:</label>
								<input
									type='text'
									value={nombreEdit}
									onChange={handleNombreEditChange}
								/>
							</div>
							<div>
								<label>Email:</label>
								<input
									type='email'
									value={emailEdit}
									onChange={handleEmailEditChange}
								/>
							</div>
							<div>
								<label>Teléfono:</label>
								<input
									type='text'
									value={telefonoEdit}
									onChange={handleTelefonoEditChange}
								/>
							</div>
							<div>
								<label>Vehículo:</label>
								<input
									type='text'
									value={vehiculoEdit}
									onChange={handleVehiculoEditChange}
								/>
							</div>
							<div>
								<label>Número de Placa:</label>
								<input
									type='text'
									value={numeroPlacaEdit}
									onChange={handleNumeroPlacaEditChange}
								/>
							</div>
							<div>
								<label>Último Servicio:</label>
								<input
									type='text'
									value={ultimoServicioEdit}
									onChange={handleUltimoServicioEditChange}
								/>
							</div>
							<div>
								<label>Fecha de Ingreso:</label>
								<input
									type='text'
									value={fechaIngresoEdit}
									onChange={handleFechaIngresoEditChange}
								/>
							</div>
							<div>
								<label>Estado de Cuenta:</label>
								<input
									type='text'
									value={estadoCuentaEdit}
									onChange={handleEstadoCuentaEditChange}
								/>
							</div>
							<div>
								<label>Observaciones:</label>
								<textarea
									value={observacionesEdit}
									onChange={handleObservacionesEditChange}
								></textarea>
							</div>
							<button type='submit'>Guardar cambios</button>
							<button type='button' onClick={cerrarModalEdicion}>
								Cerrar
							</button>
						</form>
					</ModalContent>
				</ModalContainer>
			)}
			{showModal && (
				<ModalContainer>
					<ModalContent>
						<CloseButton onClick={cerrarModal}>&times;</CloseButton>
						<h2>Nuevo Cliente</h2>
						<form onSubmit={handleSubmit}>
							<div>
								<label>Nombre:</label>
								<input
									type='text'
									value={nombre}
									onChange={event => setNombre(event.target.value)}
								/>
							</div>
							<div>
								<label>Email:</label>
								<input
									type='email'
									value={email}
									onChange={event => setEmail(event.target.value)}
								/>
							</div>
							<div>
								<label>Teléfono:</label>
								<input
									type='text'
									value={telefono}
									onChange={event => setTelefono(event.target.value)}
								/>
							</div>
							<div>
								<label>Vehículo:</label>
								<input
									type='text'
									value={vehiculo}
									onChange={event => setVehiculo(event.target.value)}
								/>
							</div>
							<div>
								<label>Número de Placa:</label>
								<input
									type='text'
									value={numeroPlaca}
									onChange={event => setNumeroPlaca(event.target.value)}
								/>
							</div>
							<div>
								<label>Último Servicio:</label>
								<input
									type='text'
									value={ultimoServicio}
									onChange={event => setUltimoServicio(event.target.value)}
								/>
							</div>
							<div>
								<label>Fecha de Ingreso:</label>
								<input
									type='text'
									value={fechaIngreso}
									onChange={event => setFechaIngreso(event.target.value)}
								/>
							</div>
							<div>
								<label>Estado de Cuenta:</label>
								<input
									type='text'
									value={estadoCuenta}
									onChange={event => setEstadoCuenta(event.target.value)}
								/>
							</div>
							<div>
								<label>Observaciones:</label>
								<textarea
									value={observaciones}
									onChange={event => setObservaciones(event.target.value)}
								></textarea>
							</div>
							<button type='submit'>Guardar</button>
							<button type='button' onClick={cerrarModal}>
								Cerrar
							</button>
						</form>
					</ModalContent>
				</ModalContainer>
			)}
		</div>
	);
}

export default Clientes;
