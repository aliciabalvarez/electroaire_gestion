import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
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
	StyledSave,
	StyledForm,
	StyledTitleForm,
	StyledSearch,
	StyledPTarjetaMenuDescription,
	StyledButtonTarjetaEditar,
	StyledButtonTarjetaEliminar,
	StyledContainer,
	StyledTitle,
	StyledNewTask,
	StyledPTarjetaMenu,
	StyledPTarjetaMenuBig,
	StyledTarjetaMenu,
	StyledMenuHome,
	StyledPMenuHome,
	StyledPMenuHomeBig
} from './styles.js';

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
			<StyledContainer>
				<div>
					<StyledTitle>Listado de Clientes</StyledTitle>
					<StyledSearch
						type='text'
						placeholder='Buscar'
						value={searchTerm}
						onChange={handleSearchChange}
					/>
				</div>
				<StyledNewTask to='#' onClick={abrirModal}>
					Nuevo Cliente
				</StyledNewTask>
			</StyledContainer>

			<StyledMenuHome>
				<StyledPMenuHome>Nombre</StyledPMenuHome>
				<StyledPMenuHomeBig>Email</StyledPMenuHomeBig>
				<StyledPMenuHome>Teléfono</StyledPMenuHome>
				<StyledPMenuHome>Vehículo</StyledPMenuHome>
				<StyledPMenuHome>Matrícula</StyledPMenuHome>
				<StyledPMenuHomeBig>Último servicio</StyledPMenuHomeBig>
				<StyledPMenuHomeBig>Fecha creación</StyledPMenuHomeBig>
				<StyledPMenuHomeBig>Estado cuenta</StyledPMenuHomeBig>
			</StyledMenuHome>

			{filteredClientes.map(cliente => (
				<StyledTarjetaMenu key={cliente.id}>
					<StyledPTarjetaMenu>{cliente.nombre}</StyledPTarjetaMenu>
					<StyledPTarjetaMenuBig>{cliente.email}</StyledPTarjetaMenuBig>
					<StyledPTarjetaMenu>{cliente.telefono}</StyledPTarjetaMenu>
					<StyledPTarjetaMenu>{cliente.vehiculo}</StyledPTarjetaMenu>
					<StyledPTarjetaMenu>{cliente.numeroPlaca}</StyledPTarjetaMenu>
					<StyledPTarjetaMenuBig>
						{cliente.ultimoServicio}
					</StyledPTarjetaMenuBig>
					<StyledPTarjetaMenuBig>{cliente.fechaIngreso}</StyledPTarjetaMenuBig>
					<StyledPTarjetaMenuBig>{cliente.estadoCuenta}</StyledPTarjetaMenuBig>
					<StyledPTarjetaMenuDescription>
						{cliente.observaciones}
					</StyledPTarjetaMenuDescription>
					<StyledButtonTarjetaEditar
						onClick={() => cliente.id && abrirModalEdicion(cliente)}
					>
						<FontAwesomeIcon icon={faPenToSquare} />
					</StyledButtonTarjetaEditar>
					<StyledButtonTarjetaEliminar onClick={() => handleDelete(cliente.id)}>
						<FontAwesomeIcon icon={faXmark} />
					</StyledButtonTarjetaEliminar>
				</StyledTarjetaMenu>
			))}

			{showEditModal && clienteSeleccionado && (
				<ModalContainer>
					<ModalContentClients>
						<StyledTitleForm>Editar cliente</StyledTitleForm>
						<StyledForm onSubmit={handleEditSubmit}>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Nombre'
									type='text'
									value={nombreEdit}
									onChange={handleNombreEditChange}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Email'
									type='email'
									value={emailEdit}
									onChange={handleEmailEditChange}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Teléfono'
									type='text'
									value={telefonoEdit}
									onChange={handleTelefonoEditChange}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Vehículo'
									type='text'
									value={vehiculoEdit}
									onChange={handleVehiculoEditChange}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Número de Placa'
									type='text'
									value={numeroPlacaEdit}
									onChange={handleNumeroPlacaEditChange}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Último servicio'
									type='text'
									value={ultimoServicioEdit}
									onChange={handleUltimoServicioEditChange}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Fecha de Ingreso'
									type='text'
									value={fechaIngresoEdit}
									onChange={handleFechaIngresoEditChange}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Estado de cuenta'
									type='text'
									value={estadoCuentaEdit}
									onChange={handleEstadoCuentaEditChange}
								/>
							</StyledFormComponent>

							<StyledFormTextarea
								placeholder='Observaciones'
								value={observacionesEdit}
								onChange={handleObservacionesEditChange}
							></StyledFormTextarea>
							<StyledSave type='submit' value='Guardar' />
							<CloseButton type='button' onClick={cerrarModalEdicion}>
								<FontAwesomeIcon icon={faXmark} />
							</CloseButton>
						</StyledForm>
					</ModalContentClients>
				</ModalContainer>
			)}
			{showModal && (
				<ModalContainer>
					<ModalContentClients>
						<StyledTitleForm>Nuevo Cliente</StyledTitleForm>
						<StyledForm onSubmit={handleSubmit}>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Nombre'
									type='text'
									value={nombre}
									onChange={event => setNombre(event.target.value)}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Email'
									type='email'
									value={email}
									onChange={event => setEmail(event.target.value)}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Teléfono'
									type='text'
									value={telefono}
									onChange={event => setTelefono(event.target.value)}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Vehículo'
									type='text'
									value={vehiculo}
									onChange={event => setVehiculo(event.target.value)}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Número de Placa'
									type='text'
									value={numeroPlaca}
									onChange={event => setNumeroPlaca(event.target.value)}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Último Servicio'
									type='text'
									value={ultimoServicio}
									onChange={event => setUltimoServicio(event.target.value)}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Fecha de Ingreso'
									type='text'
									value={fechaIngreso}
									onChange={event => setFechaIngreso(event.target.value)}
								/>
							</StyledFormComponent>
							<StyledFormComponent>
								<StyledFormInput
									placeholder='Estado de cuenta'
									type='text'
									value={estadoCuenta}
									onChange={event => setEstadoCuenta(event.target.value)}
								/>
							</StyledFormComponent>
							<StyledFormTextarea
								placeholder='Observaciones'
								value={observaciones}
								onChange={event => setObservaciones(event.target.value)}
							></StyledFormTextarea>
							<StyledSave type='submit' value='Guardar' />
							<CloseButton type='button' onClick={cerrarModal}>
								<FontAwesomeIcon icon={faXmark} />
							</CloseButton>
						</StyledForm>
					</ModalContentClients>
				</ModalContainer>
			)}
		</div>
	);
}

export default Clientes;
