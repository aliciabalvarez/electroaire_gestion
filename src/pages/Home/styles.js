import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 30px;
margin: 10vh 0 2vh 0;
`;

const StyledTitle = styled.h1`
margin-bottom: 0px;
color: #353535;
font-size: 25px;
`;
const StyledDescription = styled.p`
color: #353535;
margin-top: 7px;
`;
const StyledNewTask = styled.div`
background-color: #a1c11e;
    padding: 10px 15px;
    border-radius: 5px;
    color: white;
    font-weight: 400;
    cursor: pointer;
`;
const StyledSearch = styled.input`
border: none;
    padding: 10px;
    border-radius: 50px;
    margin-left: 25px;
    margin-bottom: 5vh;
`;

const StyledMenuHome = styled.div`
display: flex;
margin-left: 39px;
font-size: 14px;
text-transform: capitalize;
color: #a1c11e;
font-weight: 500;
margin-bottom: 5px;
text-decoration: overline;
`;
const StyledPMenuHome = styled.p`
width: 100px;
`;
const StyledPMenuHomeBig = styled.p`
width: 150px;
`;
const StyledTarjetaMenu = styled.div`
display: flex;
flex-wrap: wrap;
align-items: center;
background-color: #ffffff;
margin: 0 25px;
margin-bottom: 20px;
border-radius: 10px;
font-size: 13px;
padding: 15px;
font-weight: 600;
box-shadow: 3px 3px 10px #00000036;
color: #959595;
`;
const StyledPTarjetaMenu = styled.p`
width: 100px;
`;
const StyledPTarjetaMenuBig = styled.p`
width: 150px;
`;
const StyledPTarjetaMenuDescription = styled.p`
line-height: 22px;
font-weight: 500;
color: #353535;
width:100%;
`;
const StyledButtonTarjetaEditar = styled.button`
background-color: #c3933942;
    padding: 6px 15px;
    border-radius: 5px;
    color: orange;
    font-weight: 400;
    margin-right: 7px;
    border: 1px solid orange;
    &:hover {
      background-color: rgb(202 151 54 / 46%);
      cursor:pointer;
    }
`;
const StyledButtonTarjetaEliminar = styled.button`
background-color: #d8131330;
padding: 6px 15px;
border-radius: 5px;
color: #d81313;
font-weight: 400;
margin-right: 5px;
border: 1px solid #d81313;
&:hover {
  background-color: rgb(216 19 19 / 35%);
  cursor:pointer;
}
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  width: 400px;
  max-width: 90%;
`;

const StyledNavLink = styled(NavLink)`
  /* Estilos personalizados para el enlace */
`;
export {
	ModalWrapper, ModalContent, StyledNavLink, StyledContainer,StyledDescription,StyledNewTask, StyledTitle, StyledSearch, StyledMenuHome, StyledPMenuHomeBig, StyledPMenuHome, StyledTarjetaMenu, StyledButtonTarjetaEditar, StyledButtonTarjetaEliminar, StyledPTarjetaMenuBig, StyledPTarjetaMenu, StyledPTarjetaMenuDescription
};
