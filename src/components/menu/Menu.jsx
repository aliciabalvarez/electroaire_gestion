import { useContext } from 'react';
import {
	StyledLi,
	StyledLink,
	StyledUl,
	ContainerMenu,
	StyledImgBigLogo,
	StyledH4Menu,
	StyledPMenu,
	StyledHr,
	StyledNav,
	StyledButtonSignOut
} from './styles.js';
import { AuthContext } from '../../contexts/Auth.context.js';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase.config';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHouse,
	faPaperclip,
	faUser,
	faUserTie
} from '@fortawesome/free-solid-svg-icons';

const Menu = () => {
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	// Función para agregar la fecha actual
	const agregarFecha = () => {
		const fecha = new Date(); // Obtiene la fecha actual
		const dia = fecha.getDate(); // Obtiene el día del mes
		const mes = fecha.getMonth() + 1; // Obtiene el mes (0-11)
		const anio = fecha.getFullYear(); // Obtiene el año

		// Formatea la fecha como "dd/mm/yyyy"
		const fechaFormateada = `${dia}/${mes}/${anio}`;

		// Obtiene la hora actual
		const horas = fecha.getHours(); // Obtiene las horas (0-23)
		const minutos = fecha.getMinutes(); // Obtiene los minutos (0-59)
		const segundos = fecha.getSeconds(); // Obtiene los segundos (0-59)

		// Formatea la hora como "hh:mm:ss"
		const horaFormateada = `${horas}:${minutos}`;

		return `${fechaFormateada} ${horaFormateada}`;
	};

	const handleSignOut = async () => {
		await signOut(auth);
		navigate('/');
	};

	return (
		<nav>
			<StyledUl>
				{/* <StyledLi>
					<StyledLink to='/'>HOME</StyledLink>
				</StyledLi> */}
				{!currentUser ? (
					<>
						{/* <StyledLi>
							<StyledLink to='/login'>LOGIN</StyledLink>
						</StyledLi> */}
					</>
				) : (
					<>
						<ContainerMenu>
							<StyledImgBigLogo src='../big_logo.png' />
							<StyledH4Menu>
								Sesión iniciada: <br /> {currentUser ? currentUser.email : ''}
							</StyledH4Menu>
							<StyledPMenu>{agregarFecha()}</StyledPMenu>{' '}
							<StyledButtonSignOut onClick={handleSignOut}>
								Cerrar sesión
							</StyledButtonSignOut>
							<StyledHr />
							<StyledNav>
								<ul>
									<StyledLi>
										<StyledLink to='/'>
											<FontAwesomeIcon icon={faHouse} />
											&nbsp; INICIO
										</StyledLink>
									</StyledLi>
									<StyledLi>
										<StyledLink to='/clientes'>
											<FontAwesomeIcon icon={faUser} />
											&nbsp; CLIENTES
										</StyledLink>
										<ul>
											<StyledLink to='/albaranes'>
												<FontAwesomeIcon icon={faPaperclip} />
												&nbsp; ALBARANES
											</StyledLink>
										</ul>
									</StyledLi>
									<StyledLi>
										<StyledLink to='/proveedores'>
											<FontAwesomeIcon icon={faUserTie} />
											&nbsp; PROVEEDORES
										</StyledLink>
									</StyledLi>
								</ul>
							</StyledNav>
						</ContainerMenu>
					</>
				)}
			</StyledUl>
		</nav>
	);
};

export default Menu;
