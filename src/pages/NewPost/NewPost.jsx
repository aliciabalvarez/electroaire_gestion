import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { redirect, useNavigate } from 'react-router-dom';
import { addDoc } from 'firebase/firestore';
import { blogCollectionReference } from '../../config/firebase.config';
import UploadPhoto from '../../components/UploadPhoto/UploadPhoto';
import { ModalContent, ModalContainer, CloseButton } from './styles.js';

const NewPost = ({ closeModal, createPost }) => {
	const { currentUser } = useContext(AuthContext);
	if (!currentUser) {
		return redirect('/');
	}

	const [categoriaState, setCategoriaState] = useState('');
	const [clienteState, setClienteState] = useState('');
	const [modeloState, setModeloState] = useState('');
	const [correoState, setCorreoState] = useState('');
	const [telefonoState, setTelefonoState] = useState('');
	const [fechaEntregaState, setFechaEntregaState] = useState('');
	const [imageState, setimageState] = useState('');
	const [descripcionState, setDescripcionState] = useState('');

	const handleSubmit = async e => {
		e.preventDefault();

		try {
			await addDoc(blogCollectionReference, {
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
			});

			closeModal();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<h3>Nueva tarea</h3>
			<form onSubmit={handleSubmit}>
				Categoría:{' '}
				<input
					type='text'
					value={categoriaState}
					onChange={e => setCategoriaState(e.target.value)}
				/>
				<br />
				Cliente:{' '}
				<input
					type='text'
					value={clienteState}
					onChange={e => setClienteState(e.target.value)}
				/>
				<br />
				Modelo:{' '}
				<input
					type='text'
					value={modeloState}
					onChange={e => setModeloState(e.target.value)}
				/>
				<br />
				Correo:{' '}
				<input
					type='email'
					value={correoState}
					onChange={e => setCorreoState(e.target.value)}
				/>
				<br />
				Teléfono:{' '}
				<input
					type='tel'
					value={telefonoState}
					onChange={e => setTelefonoState(e.target.value)}
				/>
				<br />
				Fecha de entrega:{' '}
				<input
					type='date'
					value={fechaEntregaState}
					onChange={e => setFechaEntregaState(e.target.value)}
				/>
				<br />
				<textarea
					type='text'
					value={descripcionState}
					onChange={e => setDescripcionState(e.target.value)}
				></textarea>
				<br />
				{/* <UploadPhoto setimageState={setimageState}></UploadPhoto> */}
				<br />
				<input type='submit' value='Publicar nuevo post' />
				<CloseButton onClick={closeModal}>Cerrar</CloseButton>
			</form>
		</>
	);
};

const createPost = async (
	e,
	categoriaState,
	clienteState,
	modeloState,
	correoState,
	telefonoState,
	fechaentregaState,
	imageState,
	descripcionState,
	author
) => {
	e.preventDefault();

	try {
		await addDoc(blogCollectionReference, {
			categoria: categoriaState,
			cliente: clienteState,
			modelo: modeloState,
			correo: correoState,
			telefono: telefonoState,
			fechacreacion: new Date().toLocaleString(),
			fechaentrega: fechaentregaState,
			descripcion: descripcionState,

			image: imageState,
			author: author
		});
	} catch (err) {
		console.log(err);
	}
	e.target.reset();
};

export default NewPost;
