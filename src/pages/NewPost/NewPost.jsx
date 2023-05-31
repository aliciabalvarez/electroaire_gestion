import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { redirect, useNavigate } from 'react-router-dom';
import { addDoc } from 'firebase/firestore';
import { blogCollectionReference } from '../../config/firebase.config';
import UploadPhoto from '../../components/UploadPhoto/UploadPhoto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faXmark } from '@fortawesome/free-solid-svg-icons';

import {
	ModalContent,
	CloseButton,
	StyledFormComponent,
	StyledFormInput,
	StyledFormTextarea,
	StyledSaveForm,
	StyledForm,
	StyledTitleForm
} from './styles.js';

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
		<div>
			<StyledTitleForm>Nueva tarea</StyledTitleForm>
			<StyledForm onSubmit={handleSubmit}>
				<StyledFormComponent>
					<StyledFormInput
						placeholder='Categoría'
						type='text'
						value={categoriaState}
						onChange={e => setCategoriaState(e.target.value)}
					/>
				</StyledFormComponent>
				<StyledFormComponent>
					<StyledFormInput
						placeholder='Cliente'
						type='text'
						value={clienteState}
						onChange={e => setClienteState(e.target.value)}
					/>
				</StyledFormComponent>

				<StyledFormComponent>
					<StyledFormInput
						placeholder='Modelo'
						type='text'
						value={modeloState}
						onChange={e => setModeloState(e.target.value)}
					/>
				</StyledFormComponent>

				<StyledFormComponent>
					<StyledFormInput
						placeholder='Correo'
						type='email'
						value={correoState}
						onChange={e => setCorreoState(e.target.value)}
					/>
				</StyledFormComponent>

				<StyledFormComponent>
					<StyledFormInput
						placeholder='Teléfono'
						type='tel'
						value={telefonoState}
						onChange={e => setTelefonoState(e.target.value)}
					/>
				</StyledFormComponent>

				<StyledFormComponent>
					<StyledFormInput
						placeholder='Fecha de entrega'
						type='date'
						value={fechaEntregaState}
						onChange={e => setFechaEntregaState(e.target.value)}
					/>
				</StyledFormComponent>

				<StyledFormTextarea
					placeholder='Descripción'
					type='text'
					value={descripcionState}
					onChange={e => setDescripcionState(e.target.value)}
				></StyledFormTextarea>

				{/* <UploadPhoto setimageState={setimageState}></UploadPhoto> */}

				<StyledSaveForm type='submit' value='Guardar' />
				<CloseButton onClick={closeModal}>
					<FontAwesomeIcon icon={faXmark} />
				</CloseButton>
			</StyledForm>
		</div>
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
