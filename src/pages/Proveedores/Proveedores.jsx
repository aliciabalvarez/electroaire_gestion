import React, { useState, useEffect } from 'react';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	updateDoc
} from 'firebase/firestore';
import { ProveedoresCollectionReference } from '../../config/firebase.config';
import Modal from 'react-modal';
import { ModalContainer, ModalContent, CloseButton } from './styles';

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
			<h1>Proveedores</h1>
			<input
				type='text'
				placeholder='Buscar por categoría'
				value={searchTerm}
				onChange={handleSearchChange}
			/>
			<button onClick={abrirModal}>Agregar Proveedor</button>
			<table>
				<thead>
					<tr>
						<th>Nombre</th>
						<th>Tipo de Proveedor</th>
						<th>Dirección</th>
						<th>Teléfono</th>
						<th>Correo</th>
						<th>Sitio Web</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{filteredProveedores.map(proveedor => (
						<tr key={proveedor.id}>
							<td>{proveedor.nombre}</td>
							<td>{proveedor.tipoProveedor}</td>
							<td>{proveedor.direccion}</td>
							<td>{proveedor.telefono}</td>
							<td>{proveedor.correo}</td>
							<td>{proveedor.sitioWeb}</td>
							<td>
								<button onClick={() => abrirModalEdicion(proveedor)}>
									Editar
								</button>
								<button onClick={() => handleDelete(proveedor)}>
									Eliminar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<Modal
				isOpen={showModal}
				onRequestClose={cerrarModal}
				contentLabel='Agregar Proveedor'
			>
				<ModalContainer>
					<ModalContent>
						<h2>Agregar Proveedor</h2>
						<form onSubmit={handleSubmit}>
							<label>
								Nombre:
								<input
									type='text'
									value={nombre}
									onChange={event => setNombre(event.target.value)}
								/>
							</label>
							<label>
								Tipo de Proveedor:
								<input
									type='text'
									value={tipoProveedor}
									onChange={event => setTipoProveedor(event.target.value)}
								/>
							</label>
							<label>
								Dirección:
								<input
									type='text'
									value={direccion}
									onChange={event => setDireccion(event.target.value)}
								/>
							</label>
							<label>
								Teléfono:
								<input
									type='text'
									value={telefono}
									onChange={event => setTelefono(event.target.value)}
								/>
							</label>
							<label>
								Correo:
								<input
									type='text'
									value={correo}
									onChange={event => setCorreo(event.target.value)}
								/>
							</label>
							<label>
								Sitio Web:
								<input
									type='text'
									value={sitioWeb}
									onChange={event => setSitioWeb(event.target.value)}
								/>
							</label>
							<button type='submit'>Agregar</button>
						</form>
						<CloseButton onClick={cerrarModal}>Cerrar</CloseButton>
					</ModalContent>
				</ModalContainer>
			</Modal>
			<Modal
				isOpen={showEditModal}
				onRequestClose={cerrarModalEdicion}
				contentLabel='Editar Proveedor'
			>
				<ModalContainer>
					<ModalContent>
						<h2>Editar Proveedor</h2>
						<form onSubmit={handleEditSubmit}>
							<label>
								Nombre:
								<input
									type='text'
									value={nombreEdit}
									onChange={handleNombreEditChange}
								/>
							</label>
							<label>
								Tipo de Proveedor:
								<input
									type='text'
									value={tipoProveedorEdit}
									onChange={handleTipoProveedorEditChange}
								/>
							</label>
							<label>
								Dirección:
								<input
									type='text'
									value={direccionEdit}
									onChange={handleDireccionEditChange}
								/>
							</label>
							<label>
								Teléfono:
								<input
									type='text'
									value={telefonoEdit}
									onChange={handleTelefonoEditChange}
								/>
							</label>
							<label>
								Correo:
								<input
									type='text'
									value={correoEdit}
									onChange={handleCorreoEditChange}
								/>
							</label>
							<label>
								Sitio Web:
								<input
									type='text'
									value={sitioWebEdit}
									onChange={handleSitioWebEditChange}
								/>
							</label>
							<button type='submit'>Guardar Cambios</button>
						</form>
						<CloseButton onClick={cerrarModalEdicion}>Cerrar</CloseButton>
					</ModalContent>
				</ModalContainer>
			</Modal>
		</div>
	);
}

export default Proveedores;
