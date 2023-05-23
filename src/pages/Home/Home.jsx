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
import { Navigate, redirect, useNavigate } from 'react-router-dom';

import { useTable } from 'react-table';
import useRows from './hooks/useRows';
import useColumns from './hooks/useColumns';

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

	const columns = useColumns();
	const data = useRows();
	const table = useTable({ columns, data });

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		table;

	return (
		<>
			<h1>Bienvenido {currentUser ? currentUser.email : ''}</h1>
			<h3>Aquí tienes tus tareas pendientes:</h3>
			<br />
			<br />
			<br />
			<input type='text' name='' placeholder='Buscar' id='' />
			<select name='' id=''>
				<option value=''>Todas las categorías</option>
			</select>

			{/* Añadimos las propiedades a nuestra tabla nativa */}
			<table {...getTableProps()}>
				<thead>
					{
						// Recorremos las columnas que previamente definimos
						headerGroups.map(headerGroup => (
							// Añadimos las propiedades al conjunto de columnas
							<tr {...headerGroup.getHeaderGroupProps()}>
								{
									// Recorremos cada columna del conjunto para acceder a su información
									headerGroup.headers.map(column => (
										// Añadimos las propiedades a cada celda de la cabecera
										<th {...column.getHeaderProps()}>
											{
												// Pintamos el título de nuestra columna (propiedad "Header")
												column.render('Header')
											}
										</th>
									))
								}
							</tr>
						))
					}
				</thead>
				{/* Añadimos las propiedades al cuerpo de la tabla */}
				<tbody {...getTableBodyProps()}>
					{
						// Recorremos las filas
						rows.map(row => {
							// Llamamos a la función que prepara la fila previo renderizado
							prepareRow(row);
							return (
								// Añadimos las propiedades a la fila
								<tr {...row.getRowProps()}>
									{
										// Recorremos cada celda de la fila
										row.cells.map(cell => {
											// Añadimos las propiedades a cada celda de la fila
											return (
												<td {...cell.getCellProps()}>
													{
														// Pintamos el contenido de la celda
														cell.render('Cell')
													}
												</td>
											);
										})
									}
								</tr>
							);
						})
					}
				</tbody>
			</table>

			{posts.map(post => (
				<div key={post.id}>
					<h2>{post.title}</h2>
					<h3>{post.text}</h3>
					<p>{post.author}</p>
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
