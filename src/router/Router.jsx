import { Navigate, Route, Routes, redirect } from 'react-router-dom';
import Layout from '../layouts/layout';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import Login from '../pages/Login/Login';
import Profile from '../pages/Profile/Profile';
import NewPost from '../pages/NewPost/NewPost';
import PostDetails from '../pages/PostDetails/PostDetails';
import { useContext } from 'react';
import { AuthContext } from '../contexts/Auth.context';

const Router = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<Routes>
			<Route path='/' element={<Layout />}>
				{!currentUser ? (
					<>
						<Route index element={<Login />} />
						{/* <Route path='/register' element={<Register />} /> */}
					</>
				) : (
					<>
						<Route index element={<Home />} />

						<Route path='/profile' element={<Profile />} />
						<Route path='/newpost' element={<NewPost />} />
						<Route path='/post-details' element={<PostDetails />} />
					</>
				)}
			</Route>
			<Route path='*' element={<Navigate to='/' />} />
		</Routes>
	);
};

export default Router;
