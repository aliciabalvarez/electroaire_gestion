import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { blogCollectionReference } from '../../config/firebase.config';

const PostDetails = () => {
	const { state } = useLocation();
	console.log(state);

	const [postTitle, setPostTitle] = useState(state.title);
	const [postText, setPostText] = useState(state.text);
	console.log(postTitle);
	console.log(postText);

	return (
		<>
			<p>DETALLES DEL POST: para editar</p>
			<form onSubmit={e => e.preventDefault()}>
				<input
					type='text'
					name=''
					id=''
					value={postTitle}
					onChange={e => setPostTitle(e.target.value)}
				/>
				<br />
				<textarea
					type='text'
					name=''
					id=''
					value={postText}
					onChange={e => setPostText(e.target.value)}
				></textarea>
				<br />
				<button onClick={() => updatePost(state.id, postTitle, postText)}>
					ACTUALIZAR INFO
				</button>
			</form>
		</>
	);
};

const updatePost = async (id, postTitle, postText) => {
	console.log(id, postText, postTitle);
	const newData = { title: postTitle, text: postText };
	try {
		const postToUpdate = doc(blogCollectionReference, id);
		await updateDoc(postToUpdate, newData);
		console.log('Documento actualizado con éxito');
	} catch (error) {
		console.error('Error al actualizar el documento:', error);
	}
};

export default PostDetails;
