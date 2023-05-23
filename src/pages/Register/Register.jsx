import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useContext, useState } from 'react';
import { auth } from '../../config/firebase.config';
import { AuthContext } from '../../contexts/Auth.context';
import { redirect, useNavigate } from 'react-router-dom';

const Register = () => {
	const { currentUser } = useContext(AuthContext);
	if (!currentUser) {
		redirect('/');
	}

	const [userMailRegister, setUserMailRegister] = useState('');
	const [userPassRegister, setUserPassRegister] = useState('');
	const navigate = useNavigate();

	return (
		<>
			<h1>Register</h1>
			<form
				onSubmit={e =>
					handleSubmit(e, userMailRegister, userPassRegister, navigate)
				}
			>
				Email:{' '}
				<input
					type='text'
					value={userMailRegister}
					onChange={e => setUserMailRegister(e.target.value)}
				/>{' '}
				<br />
				Password:{' '}
				<input
					type='password'
					value={userPassRegister}
					onChange={e => setUserPassRegister(e.target.value)}
				/>{' '}
				<br />
				Confirm Password <input type='password' /> <br />
				<input type='submit' value='Sign up' />
			</form>
		</>
	);
};

const handleSubmit = async (
	e,
	userMailRegister,
	userPassRegister,
	navigate
) => {
	e.preventDefault();
	const email = userMailRegister;
	const password = userPassRegister;
	try {
		await createUserWithEmailAndPassword(auth, email, password);
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};

export default Register;
