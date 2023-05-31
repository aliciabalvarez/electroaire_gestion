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
color: #353535;
    font-size: 14px;
    text-decoration: none;
    font-weight: 700;
    letter-spacing: 1px;
	&.active {
		color: rgb(161, 193, 30);
	}
	&:active {
		color: blue;
	}
`;
const ContainerMenu = styled.div`
position: fixed;
top: 0px;
left: 0px;
height: 100vh;
background-color: white;
width: 25%;
min-width: 200px;
text-align: center;
padding: 50px 3%;
box-sizing: border-box;
box-shadow: rgba(0, 0, 0, 0.11) 1px 1px 20px;
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
	text-align:center;
`;
const StyledPMenu = styled.p`
	color: #a0c11d;
	text-align: left;
	width: 160px;
	margin: auto;
	font-weight: 500;
	margin-top: 20px;
	margin-bottom: 50px;
	text-align:center;
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
const StyledButtonSignOut = styled.button`
	    background-color: #d81313;
    padding: 10px 15px;
    border-radius: 21px;
    color: white;
    font-weight: 400;
    cursor: pointer;
    border: none;
    width: 52%;
    margin-bottom: 15%;
	&:hover {
		background-color: #9c1212;
		cursor:pointer;
	  }
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
	StyledNav,
	StyledButtonSignOut
};
