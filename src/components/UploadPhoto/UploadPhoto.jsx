// import {  } from "./styles.js";

import { useContext } from 'react';
import { v4 } from 'uuid';
import { AuthContext } from '../../contexts/Auth.context';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../config/firebase.config';

const UploadPhoto = ({ setimageState }) => {
	const { currentUser } = useContext(AuthContext);
	if (!currentUser) {
		redirect('/');
	}
	return (
		<>
			<input
				type='file'
				onChange={e => handleLoadFile(e, currentUser, setimageState)}
			/>
		</>
	);
};
const handleLoadFile = async (e, currentUser, setimageState) => {
	console.log(e.target.files[0]);
	const file = e.target.files[0];
	const nameNoExtension = file.name.substring(0, file.name.indexOf('.'));
	const finalName = `${nameNoExtension}-${v4()}`;
	const directory = currentUser.email;
	const storageRef = ref(storage, `${directory}/${finalName}`);

	try {
		const upload = await uploadBytes(storageRef, file);
		const imageURL = await getDownloadURL(storageRef);
		console.log(upload);
		console.log(imageURL);
		setimageState(imageURL);
	} catch (err) {
		console.error('Error al subir el archivo:', err);
	}
};
export default UploadPhoto;
