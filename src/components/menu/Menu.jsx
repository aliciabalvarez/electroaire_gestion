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
	StyledNav
} from './styles.js';
import { AuthContext } from '../../contexts/Auth.context.js';

const Menu = () => {
	const { currentUser } = useContext(AuthContext);

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
							{/* Agrega la fecha y hora de hoy */}
							{/* Agrega la fecha de hoy */}
							<StyledHr />
							<StyledNav>
								<ul>
									<StyledLi>
										<a href=''>Inicio</a>
									</StyledLi>
									<StyledLi>
										<StyledLink to='/clientes'>CLIENTES</StyledLink>
										<ul>
											<StyledLink to='/albaranescliente'>ALBARANES</StyledLink>

											<StyledLi>
												<a href=''>Facturas</a>
											</StyledLi>
										</ul>
									</StyledLi>
									<StyledLi>
										<StyledLink to='/proveedores'>PROVEEDORES</StyledLink>
										<ul>
											<StyledLi>
												<a href=''>Albaranes</a>
											</StyledLi>
											<StyledLi>
												<a href=''>Facturas</a>
											</StyledLi>
										</ul>
									</StyledLi>
									<StyledLi>
										<a href=''>Gestor de tareas</a>
									</StyledLi>
									<StyledLi>
										<a href=''>Histórico</a>
									</StyledLi>
									{/* <StyledLi>
										<StyledLink to='/newpost'>NEW POST</StyledLink>
									</StyledLi> */}
									<StyledLi>
										<StyledLink to='/profile'>PROFILE</StyledLink>
									</StyledLi>
								</ul>
							</StyledNav>
						</ContainerMenu>

						{/* <StyledLi>
                        <StyledLink to="/register">REGISTER</StyledLink>
                    </StyledLi> */}
					</>
				)}
			</StyledUl>
		</nav>
	);
};

export default Menu;
