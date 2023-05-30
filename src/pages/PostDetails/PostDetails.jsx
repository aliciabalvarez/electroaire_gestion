import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { blogCollectionReference } from '../../config/firebase.config';

const PostDetails = () => {
	const { state } = useLocation();
	console.log(state);

	const [post, setPost] = useState(state);

	const handleInputChange = e => {
		const { name, value } = e.target;
		setPost(prevPost => ({
			...prevPost,
			[name]: value
		}));
	};

	const handleUpdatePost = async () => {
		try {
			const postToUpdate = doc(blogCollectionReference, post.id);
			await updateDoc(postToUpdate, post);
			console.log('Documento actualizado con éxito');
		} catch (error) {
			console.error('Error al actualizar el documento:', error);
		}
	};

	return (
		<>
			<p>DETALLES DEL POST: para editar</p>
			<form onSubmit={e => e.preventDefault()}>
				<input
					type='text'
					name='id'
					value={post.id}
					onChange={handleInputChange}
				/>
				<br />
				<input
					type='text'
					name='iduser'
					value={post.iduser}
					onChange={handleInputChange}
				/>
				<br />
				<input
					type='text'
					name='categoria'
					value={post.categoria}
					onChange={handleInputChange}
				/>
				<br />
				<input
					type='text'
					name='cliente'
					value={post.cliente}
					onChange={handleInputChange}
				/>
				<br />
				<input
					type='text'
					name='modelo'
					value={post.modelo}
					onChange={handleInputChange}
				/>
				<br />
				<input
					type='text'
					name='correo'
					value={post.correo}
					onChange={handleInputChange}
				/>
				<br />
				<input
					type='text'
					name='telefono'
					value={post.telefono}
					onChange={handleInputChange}
				/>
				<br />
				<input
					type='text'
					name='fechacreacion'
					value={post.fechacreacion}
					onChange={handleInputChange}
				/>
				<br />
				<input
					type='text'
					name='fechaentrega'
					value={post.fechaentrega}
					onChange={handleInputChange}
				/>
				<br />
				<textarea
					type='text'
					name='descripcion'
					value={post.descripcion}
					onChange={handleInputChange}
				></textarea>
				<br />
				<button onClick={handleUpdatePost}>ACTUALIZAR INFO</button>
			</form>
		</>
	);
};

export default PostDetails;
