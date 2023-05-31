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
import {
	db,
	ProveedoresCollectionReference
} from '../../config/firebase.config';
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
	StyledContainer,
	StyledTitle,
	StyledSearch,
	StyledNewTask,
	StyledTarjetaMenu,
	StyledPTarjetaMenu,
	StyledButtonTarjetaEditar,
	StyledButtonTarjetaEliminar,
	StyledPTarjetaMenuBig
} from './styles.js';

function Proveedores() {
	const [showModal, setShowModal] = useState(false);
	const [proveedores, setProveedores] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	function abrirModal() {
		setShowModal(true);
	}

	function cerrarModal() {
		setShowModal(false);
	}

	const [showEditModal, setShowEditModal] = useState(false);
	const [Proveedoreseleccionado, setProveedoreseleccionado] = useState(null);
	const [nombreEdit, setNombreEdit] = useState('');
	const [tipoProveedorEdit, setTipoProveedorEdit] = useState('');
	const [direccionEdit, setDireccionEdit] = useState('');
	const [telefonoEdit, setTelefonoEdit] = useState('');
	const [correoEdit, setCorreoEdit] = useState('');
	const [sitioWebEdit, setSitioWebEdit] = useState('');

	function abrirModalEdicion(proveedor) {
		setProveedoreseleccionado(proveedor);
		setNombreEdit(proveedor.nombre);
		setTipoProveedorEdit(proveedor.tipoProveedor);
		setDireccionEdit(proveedor.direccion);
		setTelefonoEdit(proveedor.telefono);
		setCorreoEdit(proveedor.correo);
		setSitioWebEdit(proveedor.sitioWeb);
		setShowEditModal(true);
	}

	function cerrarModalEdicion() {
		setShowEditModal(false);
	}

	useEffect(() => {
		const obtenerProveedores = async () => {
			try {
				const querySnapshot = await getDocs(ProveedoresCollectionReference);
				const Proveedores = querySnapshot.docs.map(doc => ({
					id: doc.id,
					...doc.data()
				}));
				setProveedores(Proveedores);
			} catch (error) {
				console.error('Error al obtener los Proveedores:', error);
			}
		};

		obtenerProveedores();
	}, []);

	const [nombre, setNombre] = useState('');
	const [tipoProveedor, setTipoProveedor] = useState('');
	const [direccion, setDireccion] = useState('');
	const [telefono, setTelefono] = useState('');
	const [correo, setCorreo] = useState('');
	const [sitioWeb, setSitioWeb] = useState('');

	const handleNombreEditChange = event => {
		setNombreEdit(event.target.value);
	};

	const handleTipoProveedorEditChange = event => {
		setTipoProveedorEdit(event.target.value);
	};

	const handleDireccionEditChange = event => {
		setDireccionEdit(event.target.value);
	};

	const handleTelefonoEditChange = event => {
		setTelefonoEdit(event.target.value);
	};

	const handleCorreoEditChange = event => {
		setCorreoEdit(event.target.value);
	};

	const handleSitioWebEditChange = event => {
		setSitioWebEdit(event.target.value);
	};

	const handleSubmit = async event => {
		event.preventDefault();

		try {
			const proveedorData = {
				nombre: nombre,
				tipoProveedor: tipoProveedor,
				direccion: direccion,
				telefono: telefono,
				correo: correo,
				sitioWeb: sitioWeb
			};

			// Inserta los datos del proveedor en la base de datos
			await addDoc(ProveedoresCollectionReference, proveedorData);

			// Actualiza la lista de proveedores
			const querySnapshot = await getDocs(ProveedoresCollectionReference);
			const nuevosProveedores = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setProveedores(nuevosProveedores);

			// Limpia los campos del formulario
			setNombre('');
			setTipoProveedor('');
			setDireccion('');
			setTelefono('');
			setCorreo('');
			setSitioWeb('');

			// Cierra el modal
			cerrarModal();
		} catch (error) {
			console.error('Error al agregar el proveedor:', error);
		}
	};

	const handleEditSubmit = async event => {
		event.preventDefault();

		try {
			const proveedorData = {
				nombre: nombreEdit,
				tipoProveedor: tipoProveedorEdit,
				direccion: direccionEdit,
				telefono: telefonoEdit,
				correo: correoEdit,
				sitioWeb: sitioWebEdit
			};

			// Actualiza los datos del proveedor en la base de datos
			await updateDoc(
				doc(ProveedoresCollectionReference, Proveedoreseleccionado.id),
				proveedorData
			);

			// Actualiza la lista de proveedores
			const querySnapshot = await getDocs(ProveedoresCollectionReference);
			const proveedores = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setProveedores(proveedores);

			// Cierra el modal de edición
			cerrarModalEdicion();
		} catch (error) {
			console.error('Error al editar el proveedor:', error);
		}
	};

	const handleDelete = async proveedor => {
		try {
			// Elimina el proveedor de la base de datos
			await deleteDoc(doc(ProveedoresCollectionReference, proveedor.id));

			// Actualiza la lista de proveedores
			const querySnapshot = await getDocs(ProveedoresCollectionReference);
			const proveedores = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setProveedores(proveedores);
		} catch (error) {
			console.error('Error al eliminar el proveedor:', error);
		}
	};

	const handleSearchChange = event => {
		const value = event.target.value || ''; // Manejar el caso de valor undefined
		setSearchTerm(value);
	};

	const filteredProveedores = proveedores.filter(proveedor => {
		const searchTermLower = searchTerm.toLowerCase();
		return (
			proveedor.id.toLowerCase().includes(searchTermLower) ||
			proveedor.nombre.toLowerCase().includes(searchTermLower) ||
			proveedor.tipoProveedor.toLowerCase().includes(searchTermLower) ||
			proveedor.direccion.toLowerCase().includes(searchTermLower) ||
			proveedor.telefono.toLowerCase().includes(searchTermLower) ||
			proveedor.correo.toLowerCase().includes(searchTermLower) ||
			proveedor.sitioWeb.toLowerCase().includes(searchTermLower)
		);
	});

	return (
		<div>
			<StyledContainer>
				<div>
					<StyledTitle>Listado de Proveedores</StyledTitle>
					<StyledSearch
						type='text'
						placeholder='Buscar'
						value={searchTerm}
						onChange={handleSearchChange}
					/>
				</div>
				<StyledNewTask to='#' onClick={abrirModal}>
					Nuevo Proveedor
				</StyledNewTask>
			</StyledContainer>

			{filteredProveedores.map(proveedor => (
				<StyledTarjetaMenu key={proveedor.id}>
					<StyledPTarjetaMenu>{proveedor.nombre}</StyledPTarjetaMenu>
					<StyledPTarjetaMenu>{proveedor.tipoProveedor}</StyledPTarjetaMenu>
					<StyledPTarjetaMenuBig>{proveedor.direccion}</StyledPTarjetaMenuBig>
					<StyledPTarjetaMenu>{proveedor.telefono}</StyledPTarjetaMenu>
					<StyledPTarjetaMenuBig>{proveedor.correo}</StyledPTarjetaMenuBig>
					<StyledPTarjetaMenuBig>{proveedor.sitioWeb}</StyledPTarjetaMenuBig>
					<StyledButtonTarjetaEditar
						onClick={() => abrirModalEdicion(proveedor)}
					>
						<FontAwesomeIcon icon={faPenToSquare} />
					</StyledButtonTarjetaEditar>
					<StyledButtonTarjetaEliminar onClick={() => handleDelete(proveedor)}>
						<FontAwesomeIcon icon={faXmark} />
					</StyledButtonTarjetaEliminar>
				</StyledTarjetaMenu>
			))}

			<Modal
				isOpen={showModal}
				onRequestClose={cerrarModal}
				contentLabel='Agregar Proveedor'
				className='custom-modal'
				overlayClassName='custom-overlay'
			>
				<StyledTitleForm>Agregar Proveedor</StyledTitleForm>
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
							placeholder='Tipo de proveedor'
							type='text'
							value={tipoProveedor}
							onChange={event => setTipoProveedor(event.target.value)}
						/>
					</StyledFormComponent>
					<StyledFormComponent>
						<StyledFormInput
							placeholder='Dirección'
							type='text'
							value={direccion}
							onChange={event => setDireccion(event.target.value)}
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
							placeholder='Correo'
							type='text'
							value={correo}
							onChange={event => setCorreo(event.target.value)}
						/>
					</StyledFormComponent>
					<StyledFormComponent>
						<StyledFormInput
							placeholder='Sitio web'
							type='text'
							value={sitioWeb}
							onChange={event => setSitioWeb(event.target.value)}
						/>
					</StyledFormComponent>
					<StyledSave type='submit' value='Agregar' />
				</StyledForm>
				<CloseButton onClick={cerrarModal}>
					{' '}
					<FontAwesomeIcon icon={faXmark} />
				</CloseButton>
			</Modal>
			<Modal
				isOpen={showEditModal}
				onRequestClose={cerrarModalEdicion}
				contentLabel='Editar Proveedor'
				className='custom-modal'
				overlayClassName='custom-overlay'
			>
				<StyledTitleForm>Editar Proveedor</StyledTitleForm>
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
							placeholder='Tipo de Proveedor'
							type='text'
							value={tipoProveedorEdit}
							onChange={handleTipoProveedorEditChange}
						/>
					</StyledFormComponent>
					<StyledFormComponent>
						<StyledFormInput
							placeholder='Dirección'
							type='text'
							value={direccionEdit}
							onChange={handleDireccionEditChange}
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
							placeholder='Correo'
							type='text'
							value={correoEdit}
							onChange={handleCorreoEditChange}
						/>
					</StyledFormComponent>
					<StyledFormComponent>
						<StyledFormInput
							placeholder='Sitio web'
							type='text'
							value={sitioWebEdit}
							onChange={handleSitioWebEditChange}
						/>
					</StyledFormComponent>
					<StyledSave type='submit' value='Guardar' />
				</StyledForm>
				<CloseButton onClick={cerrarModalEdicion}>
					<FontAwesomeIcon icon={faXmark} />
				</CloseButton>
			</Modal>
		</div>
	);
}

export default Proveedores;
