import {
	ContenedorLogin,
	StyledImg,
	TitleH1Login,
	TitleH3Login,
	FormLogin,
	InputMailLogin,
	InputPassLogin,
	ForgetPassLogin,
	ForgetPassLoginA,
	EnterLogin,
	BtnGoogleLogin,
	StyledImgGoogle
} from './styles.js';

import { useContext, useState } from 'react';
import {
	getAuth,
	signInWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup
} from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { redirect, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth.context';

const Login = () => {
	const provider = new GoogleAuthProvider();

	const { currentUser } = useContext(AuthContext);
	if (!currentUser) {
		redirect('/');
	}

	const [userMailLogin, setUserMailLogin] = useState('');
	const [userPassLogin, setUserPassLogin] = useState('');
	const navigate = useNavigate();
	return (
		<>
			<ContenedorLogin>
				<StyledImg src='../logo.png' alt='' />
				<TitleH1Login>Inicia sesión</TitleH1Login>
				<TitleH3Login>
					Ingresa a tu espacio personal con tu nombre de usuario y contraseña
				</TitleH3Login>
				<FormLogin
					onSubmit={e =>
						handleSubmit(e, userMailLogin, userPassLogin, navigate)
					}
				>
					{' '}
					<InputMailLogin
						placeholder='Email'
						type='email'
						value={userMailLogin}
						onChange={e => setUserMailLogin(e.target.value)}
					/>{' '}
					<br />{' '}
					<InputPassLogin
						placeholder='Contraseña'
						type='password'
						value={userPassLogin}
						onChange={e => setUserPassLogin(e.target.value)}
					/>{' '}
					<br />
					<ForgetPassLogin>
						<ForgetPassLoginA href=''>
							¿Olvidaste tu contraseña?
						</ForgetPassLoginA>
					</ForgetPassLogin>
					<EnterLogin type='submit' value='Entrar' />
				</FormLogin>
				<BtnGoogleLogin onClick={loginWithGoogle}>
					{' '}
					<StyledImgGoogle src='../google_logo.png' alt='' /> Inicia sesión con
					Google
				</BtnGoogleLogin>
			</ContenedorLogin>
		</>
	);
};

const handleSubmit = async (e, userMailLogin, userPassLogin, navigate) => {
	e.preventDefault();
	const email = userMailLogin;
	const password = userPassLogin;
	try {
		await signInWithEmailAndPassword(auth, email, password);
		navigate('/');
	} catch (err) {
		console.log(err);
	}
};

const loginWithGoogle = async () => {
	const provider = new GoogleAuthProvider();
	try {
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		console.log(credential);
	} catch (err) {
		console.log(err);
	}
};

export default Login;
