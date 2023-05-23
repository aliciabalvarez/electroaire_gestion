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
							<StyledPMenu>Fecha de hoy</StyledPMenu>
							<StyledHr />
							<StyledNav>
								<ul>
									<StyledLi>
										<a href=''>Inicio</a>
									</StyledLi>
									<StyledLi>
										<a href=''>Clientes</a>
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
										<a href=''>Proveedores</a>
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
									<StyledLi>
										<StyledLink to='/newpost'>NEW POST</StyledLink>
									</StyledLi>
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
