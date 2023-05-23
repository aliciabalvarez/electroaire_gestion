import { signOut } from 'firebase/auth';
import { redirect, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase.config';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth.context';

const Profile = () => {
	const { currentUser } = useContext(AuthContext);
	if (!currentUser) {
		return redirect('/');
	}

	const navigate = useNavigate();
	return (
		<>
			<h1>Profile</h1>
			<form onSubmit={e => handleSignOut(navigate)}>
				<input type='submit' value='Sign out' />
			</form>
		</>
	);
};
const handleSignOut = async navigate => {
	await signOut(auth);
	navigate('/');
};

export default Profile;
