import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import {
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	onSnapshot
} from 'firebase/firestore';
import { blogCollectionReference } from '../../config/firebase.config';
import { NavLink, redirect, useNavigate } from 'react-router-dom';

const Home = () => {
	const { currentUser } = useContext(AuthContext);
	if (!currentUser) {
		redirect('/');
	}
	const navigate = useNavigate();

	const [posts, setPosts] = useState([]);

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

	return (
		<>
			<NavLink to='/newpost'>NUEVA TAREA</NavLink>

			<h1>Bienvenido {currentUser ? currentUser.email : ''}</h1>
			<h3>Aquí tienes tus tareas pendientes:</h3>
			<br />
			<br />
			<br />
			<input type='text' name='' placeholder='Buscar' id='' />

			{posts.map(post => (
				<div key={post.id}>
					<p>{post.id}</p>
					<p>{post.iduser}</p>
					<p>{post.categoria}</p>
					<p>{post.cliente}</p>
					<p>{post.modelo}</p>
					<p>
						{post.correo} <br /> {post.telefono}
					</p>
					<p>{post.fechacreacion}</p>
					<p>{post.fechaentrega}</p>
					<p>{post.descripcion}</p>

					<img src={post.image} alt='' />
					{currentUser && currentUser.email == post.author ? (
						<>
							<button onClick={() => getPostById(post.id)}>+ info</button>
							<button
								onClick={() => navigate(`/post-details`, { state: post })}
							>
								EDIT
							</button>
							<button onClick={() => deletePost(post.id)}>Delete post</button>
						</>
					) : (
						''
					)}
				</div>
			))}
		</>
	);
};

const getPostById = async id => {
	const postReference = doc(blogCollectionReference, id);
	try {
		const postToRead = await getDoc(postReference);
		console.log(postToRead.data());
		const userInfo = postToRead.data();
		console.log(userInfo.title);
	} catch (err) {
		console.log(err);
	}
};

const deletePost = async id => {
	try {
		const postToDelete = doc(blogCollectionReference, id);
		await deleteDoc(postToDelete);
	} catch (error) {
		console.error('Error al actualizar el documento: ', error);
	}
};

export default Home;
