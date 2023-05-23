import { useEffect, useState } from 'react';
import { AuthContext } from '../contexts/Auth.context';
import { auth } from '../config/firebase.config';

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const unsuscribre = auth.onAuthStateChanged(user => {
			if (user) {
				// El usuario está autenticado
				console.log('Usuario autenticado:', user);
				setCurrentUser(user);
			} else {
				// El usuario no está autenticado
				console.log('Usuario no autenticado');
				setCurrentUser(null);
			}
		});
		return () => unsuscribre();
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser, setCurrentUser }}>
			{children}
		</AuthContext.Provider>
	);
};
