import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledLi = styled.li`
	list-style: none;
	color: pink;
`;
const StyledUl = styled.ul`
	list-style: none;
	color: pink;
`;
const StyledLink = styled(NavLink)`
	&.active {
		color: green;
	}
	&:active {
		color: blue;
	}
`;
const ContainerMenu = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	background-color: white;
	width: 400px;
	text-align: center;
	padding: 40px;
	box-sizing: border-box;
	box-shadow: 1px 1px 20px #0000001c;
`;
const StyledImgBigLogo = styled.img`
	width: 160px;
	margin-bottom: 90px;
`;
const StyledH4Menu = styled.h4`
	color: #a0c11d;
	text-align: left;
	width: 160px;
	margin: auto;
	font-weight: 500;
`;
const StyledPMenu = styled.p`
	color: #a0c11d;
	text-align: left;
	width: 160px;
	margin: auto;
	font-weight: 500;
	margin-top: 20px;
	margin-bottom: 50px;
`;
const StyledHr = styled.hr`
	border: 0.75px solid #e3e3e3;
`;
const StyledNav = styled.nav`
	text-align: left;
	width: 240px;
	margin: auto;
	line-height: 40px;
	margin-top: 50px;
`;
export {
	StyledLi,
	StyledLink,
	StyledUl,
	ContainerMenu,
	StyledImgBigLogo,
	StyledH4Menu,
	StyledPMenu,
	StyledHr,
	StyledNav
};
