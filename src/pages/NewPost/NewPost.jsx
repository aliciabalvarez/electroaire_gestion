import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/Auth.context';
import { redirect, useNavigate } from 'react-router-dom';
import { addDoc } from 'firebase/firestore';
import { blogCollectionReference } from '../../config/firebase.config';
import UploadPhoto from '../../components/UploadPhoto/UploadPhoto';

const NewPost = () => {
	const { currentUser } = useContext(AuthContext);
	if (!currentUser) {
		return redirect('/');
	}

	const [titleState, setTitleState] = useState('');
	const [textState, setTextState] = useState('');
	const [imageState, setimageState] = useState('');

	return (
		<>
			<h1>New Post</h1>
			<form
				onSubmit={e =>
					createPost(e, titleState, textState, imageState, currentUser.email)
				}
			>
				Title:{' '}
				<input
					type='text'
					value={titleState}
					onChange={e => setTitleState(e.target.value)}
				/>
				<br />
				Text:{' '}
				<input
					type='text'
					value={textState}
					onChange={e => setTextState(e.target.value)}
				/>
				<br />
				<UploadPhoto setimageState={setimageState}></UploadPhoto>
				<br />
				<input type='submit' value='Publicar nuevo post' />
			</form>
		</>
	);
};

const createPost = async (e, titleState, textState, imageState, author) => {
	e.preventDefault();

	try {
		await addDoc(blogCollectionReference, {
			date: new Date().toLocaleString(),
			title: titleState,
			text: textState,
			image: imageState,
			author: author
		});
	} catch (err) {
		console.log(err);
	}
	e.target.reset();
};

export default NewPost;
