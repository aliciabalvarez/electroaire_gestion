import styled from 'styled-components';



export const ModalContent = styled.div`
	background-color: white;
	padding: 20px;
	border-radius: 4px;
`;

export const CloseButton = styled.button`

position: absolute;
top: 10px;
right: 10px;
border: none;
background-color: transparent;
color: #e51919;
font-size: 25px;
cursor: pointer;  
	
	`;
export const StyledFormComponent = styled.div`

display: grid;
width: 223px;
padding: 2px 5px;
`;
export const StyledFormInput = styled.input`

width: 100%;
background-color: white;
border: none;
padding: 10px 9px;
border-radius: 30px;
box-sizing: border-box;
margin-bottom: 5px;

`;
export const StyledFormTextarea = styled.textarea`

width: 98.8%;
    background-color: white;
    border: none;
    padding: 10px 9px;
    border-radius: 30px;
    box-sizing: border-box;
    margin-bottom: 30px;
    margin-top: 4px;
    margin-left: 5px;

`;
export const StyledForm = styled.form`

display:flex;
flex-wrap:wrap;

`;

export const StyledSaveForm = styled.input`
width: 109px;
background-color: #9bbb1a;
border: none;
padding: 10px 9px;
border-radius: 30px;
box-sizing: border-box;
margin-bottom: 5px;
position: relative;
left: 585px;
color: white;
font-weight: bold;
cursor: pointer;

`;
export const StyledTitleForm = styled.h3`

font-size: 23px;
    margin-left: 7px;
    color: #656565;
    font-weight: 400;

`;
// Agrega otros estilos según sea necesario
