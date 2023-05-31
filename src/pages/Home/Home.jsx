import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons';

import {
	ModalWrapper,
	ModalContent,
	StyledNavLink,
	StyledContainer,
	StyledDescription,
	StyledNewTask,
	StyledTitle,
	StyledSearch,
	StyledMenuHome,
	StyledPMenuHomeBig,
	StyledPMenuHome,
	StyledTarjetaMenu,
	StyledButtonTarjetaEditar,
	StyledButtonTarjetaEliminar,
	StyledPTarjetaMenuBig,
	StyledPTarjetaMenu,
	StyledPTarjetaMenuDescription,
	CloseButton,
	StyledFormComponent,
	StyledFormInput,
	StyledFormTextarea,
	StyledSaveForm,
	StyledForm,
	StyledTitleForm
} from './styles.js';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';

import {
	deleteDoc,
	addDoc,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	updateDoc
} from 'firebase/firestore';
import { blogCollectionReference } from '../../config/firebase.config';
import { clientesCollectionReference } from '../../config/firebase.config';
import { NavLink, redirect, useNavigate } from 'react-router-dom';
import NewPost from '../NewPost/NewPost.jsx';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Home = () => {
	const navigate = useNavigate();
	const [posts, setPosts] = useState([]);

	const { currentUser } = useContext(AuthContext);
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedPost, setSelectedPost] = useState(null);

	const openModal = () => {
		setModalIsOpen(true);
	};

	const closeModal = () => {
		setModalIsOpen(false);
	};

	const createPost = async (
		categoriaState,
		clienteState,
		modeloState,
		correoState,
		telefonoState,
		fechaEntregaState,
		imageState,
		descripcionState
	) => {
		try {
			const newTask = {
				categoria: categoriaState,
				cliente: clienteState,
				modelo: modeloState,
				correo: correoState,
				telefono: telefonoState,
				fechacreacion: new Date().toLocaleString(),
				fechaentrega: fechaEntregaState,
				descripcion: descripcionState,
				image: imageState,
				author: currentUser.email
			};

			// Guardar la tarea en la colección de tareas
			const newTaskRef = await addDoc(blogCollectionReference, newTask);
			// Obtener el ID de la tarea recién creada
			const taskId = newTaskRef.id;

			// Guardar los datos del cliente en la colección de clientes
			const newClient = {
				cliente: clienteState,
				correo: correoState,
				telefono: telefonoState,
				task: taskId // Add a reference to the task ID in the client entry
			};
			await addDoc(clientesCollectionReference, newClient);

			closeModal();
		} catch (err) {
			console.log(err);
		}
	};

	if (!currentUser) {
		return redirect('/');
	}

	useEffect(() => {
		const subscribeToData = onSnapshot(blogCollectionReference, snapshot => {
			const dataInfo = snapshot.docs.map(doc => ({
				...doc.data(),
				id: doc.id
			}));
			dataInfo.length === 0 ? setPosts(null) : setPosts(dataInfo);
		});
		return () => subscribeToData();
	}, []);

	const handleUpdatePost = async (id, updatedPost) => {
		try {
			const postToUpdate = doc(blogCollectionReference, id);
			await updateDoc(postToUpdate, updatedPost);
			console.log('Documento actualizado con éxito');
		} catch (error) {
			console.error('Error al actualizar el documento:', error);
		}
	};
	const handleDeletePost = async postId => {
		try {
			await deleteDoc(doc(blogCollectionReference, postId));
			console.log('Documento eliminado con éxito');
		} catch (error) {
			console.error('Error al eliminar el documento:', error);
		}
	};

	return (
		<>
			<div>
				<Modal
					isOpen={modalIsOpen}
					onRequestClose={closeModal}
					className='custom-modal'
					overlayClassName='custom-overlay'
				>
					<NewPost closeModal={closeModal} createPost={createPost} />
				</Modal>
				<StyledContainer>
					<div>
						<StyledTitle>Bienvenido</StyledTitle>
						<StyledDescription>
							Aquí tienes tus tareas pendientes:
						</StyledDescription>
					</div>
					<StyledNewTask to='#' onClick={openModal}>
						Nueva tarea
					</StyledNewTask>
				</StyledContainer>

				{selectedPost && (
					<Modal
						className='custom-modal'
						overlayClassName='custom-overlay'
						isOpen={true}
						onRequestClose={() => setSelectedPost(null)}
					>
						<div>
							<StyledTitleForm>Editar tarea</StyledTitleForm>
							<StyledForm
								onSubmit={e => {
									e.preventDefault();
									handleUpdatePost(selectedPost.id, selectedPost);
									setSelectedPost(null);
								}}
							>
								<StyledFormComponent>
									<StyledFormInput
										type='text'
										name='categoria'
										placeholder='categoria'
										value={selectedPost.categoria}
										onChange={e =>
											setSelectedPost(prevPost => ({
												...prevPost,
												categoria: e.target.value
											}))
										}
									/>
								</StyledFormComponent>
								<StyledFormComponent>
									<StyledFormInput
										type='text'
										name='cliente'
										placeholder='cliente'
										value={selectedPost.cliente}
										onChange={e =>
											setSelectedPost(prevPost => ({
												...prevPost,
												cliente: e.target.value
											}))
										}
									/>
								</StyledFormComponent>
								<StyledFormComponent>
									<StyledFormInput
										type='text'
										name='modelo'
										placeholder='modelo'
										value={selectedPost.modelo}
										onChange={e =>
											setSelectedPost(prevPost => ({
												...prevPost,
												modelo: e.target.value
											}))
										}
									/>
								</StyledFormComponent>
								<StyledFormComponent>
									<StyledFormInput
										type='text'
										name='correo'
										placeholder='correo'
										value={selectedPost.correo}
										onChange={e =>
											setSelectedPost(prevPost => ({
												...prevPost,
												correo: e.target.value
											}))
										}
									/>
								</StyledFormComponent>
								<StyledFormComponent>
									<StyledFormInput
										type='text'
										name='telefono'
										placeholder='telefono'
										value={selectedPost.telefono}
										onChange={e =>
											setSelectedPost(prevPost => ({
												...prevPost,
												telefono: e.target.value
											}))
										}
									/>
								</StyledFormComponent>
								<StyledFormComponent>
									<StyledFormInput
										type='text'
										name='fechacreacion'
										placeholder='Fecha creación'
										value={selectedPost.fechacreacion}
										onChange={e =>
											setSelectedPost(prevPost => ({
												...prevPost,
												fechacreacion: e.target.value
											}))
										}
									/>
								</StyledFormComponent>
								<StyledFormComponent>
									<StyledFormInput
										type='date'
										name='fechaentrega'
										placeholder='Fecha entrega'
										value={selectedPost.fechaentrega}
										onChange={e =>
											setSelectedPost(prevPost => ({
												...prevPost,
												fechaentrega: e.target.value
											}))
										}
									/>
								</StyledFormComponent>
								<StyledFormTextarea
									name='descripcion'
									placeholder='Descripción'
									value={selectedPost.descripcion}
									onChange={e =>
										setSelectedPost(prevPost => ({
											...prevPost,
											descripcion: e.target.value
										}))
									}
								/>
								<StyledSaveForm type='submit' value='Actualizar' />
							</StyledForm>
							<CloseButton onClick={() => setSelectedPost(null)}>
								<FontAwesomeIcon icon={faXmark} />
							</CloseButton>
						</div>
					</Modal>
				)}

				<StyledSearch
					type='text'
					placeholder='Buscar'
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
				/>
				<StyledMenuHome>
					<StyledPMenuHome>categoria</StyledPMenuHome>
					<StyledPMenuHome>cliente</StyledPMenuHome>
					<StyledPMenuHome>modelo</StyledPMenuHome>
					<StyledPMenuHomeBig>correo</StyledPMenuHomeBig>
					<StyledPMenuHome>telefono</StyledPMenuHome>
					<StyledPMenuHomeBig>fechacreacion</StyledPMenuHomeBig>
					<StyledPMenuHome>fechaentrega</StyledPMenuHome>
				</StyledMenuHome>

				{posts && (
					<div>
						{posts
							.filter(
								post =>
									(post.categoria &&
										post.categoria
											.toLowerCase()
											.includes(searchTerm.toLowerCase())) ||
									(post.iduser &&
										post.iduser.toString().includes(searchTerm)) ||
									(post.cliente &&
										post.cliente
											.toLowerCase()
											.includes(searchTerm.toLowerCase())) ||
									(post.modelo &&
										post.modelo
											.toLowerCase()
											.includes(searchTerm.toLowerCase())) ||
									(post.correo &&
										post.correo
											.toLowerCase()
											.includes(searchTerm.toLowerCase())) ||
									(post.telefono &&
										post.telefono.toString().includes(searchTerm)) ||
									(post.fechacreacion &&
										post.fechacreacion
											.toLowerCase()
											.includes(searchTerm.toLowerCase())) ||
									(post.fechaentrega &&
										post.fechaentrega
											.toLowerCase()
											.includes(searchTerm.toLowerCase())) ||
									(post.descripcion &&
										post.descripcion
											.toLowerCase()
											.includes(searchTerm.toLowerCase()))
							)

							.map(post => (
								<StyledTarjetaMenu key={post.id}>
									{/* <StyledPTarjetaMenu>{post.iduser}</StyledPTarjetaMenu> */}
									<StyledPTarjetaMenu>{post.categoria}</StyledPTarjetaMenu>
									<StyledPTarjetaMenu>{post.cliente}</StyledPTarjetaMenu>
									<StyledPTarjetaMenu>{post.modelo}</StyledPTarjetaMenu>
									<StyledPTarjetaMenuBig>{post.correo}</StyledPTarjetaMenuBig>
									<StyledPTarjetaMenu>{post.telefono}</StyledPTarjetaMenu>
									<StyledPTarjetaMenuBig>
										{post.fechacreacion}
									</StyledPTarjetaMenuBig>
									<StyledPTarjetaMenu>{post.fechaentrega}</StyledPTarjetaMenu>
									<div>
										<StyledButtonTarjetaEditar
											onClick={() => setSelectedPost(post)}
										>
											<FontAwesomeIcon icon={faPenToSquare} />
										</StyledButtonTarjetaEditar>
										<StyledButtonTarjetaEliminar
											onClick={() => handleDeletePost(post.id)}
										>
											<FontAwesomeIcon icon={faXmark} />
										</StyledButtonTarjetaEliminar>
									</div>
									<StyledPTarjetaMenuDescription>
										{post.descripcion}
									</StyledPTarjetaMenuDescription>
								</StyledTarjetaMenu>
							))}
					</div>
				)}
			</div>
		</>
	);
};

export default Home;
