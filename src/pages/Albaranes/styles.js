import styled from 'styled-components';

export const ModalContainer = styled.div`
position: fixed;
inset: 0px;
background-color: rgb(0 0 0 / 75%);
backdrop-filter: blur(1px);
display: flex;
justify-content: center;
align-items: center;
`;



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

export const StyledFormSelect = styled.select`

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
align-items:baseline;

`;

export const StyledSave = styled.input`
width: 109px;
background-color: #9bbb1a;
border: none;
padding: 10px 9px;
border-radius: 30px;
box-sizing: border-box;
margin-bottom: 5px;
left: 585px;
color: white;
font-weight: bold;
cursor: pointer;
position:relative;
margin-top:20px;

`;
export const StyledTitleForm = styled.h3`

font-size: 23px;
    margin-left: 7px;
    color: #656565;
    font-weight: 400;

`;
export const ModalContentClients = styled.div`

background-color: #d9d9d9;
    width: 700px;
    padding: 20px;
    border-radius: 15px;
    border: none !important;
    position: absolute;

`;
export const StyledContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
padding: 0 30px;
margin: 10vh 0 2vh 0;
`;

export const StyledTitle = styled.h1`
margin-bottom: 0px;
color: #353535;
font-size: 25px;
`;

export const StyledNewTask = styled.div`
background-color: #a1c11e;
    padding: 10px 15px;
    border-radius: 5px;
    color: white;
    font-weight: 400;
    cursor: pointer;
`;


export const StyledTarjetaMenu = styled.div`
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
export const StyledPTarjetaMenu = styled.p`
width: 100px;
`;
export const StyledPTarjetaMenuBig = styled.p`
width: 150px;
`;

export const StyledButtonTarjetaEditar = styled.button`
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
export const StyledButtonTarjetaEliminar = styled.button`
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

export const StyledButtonTarjetaPDF = styled.button`
background-color: rgb(53 216 19 / 19%);
    padding: 6px 15px;
    border-radius: 5px;
    color: rgb(58 161 30);
    font-weight: 400;
    margin-right: 5px;
    border: 1px solid rgb(71 194 59);
    &:hover {
        background-color: #35d81366;
        cursor:pointer;
      }
`;


export const StyledMenuHome = styled.div`
display: flex;
margin-left: 39px;
font-size: 14px;
text-transform: capitalize;
color: #a1c11e;
font-weight: 500;
margin-bottom: 5px;
text-decoration: overline;
`;
export const StyledPMenuHome = styled.p`
width: 100px;
`;
export const StyledPMenuHomeBig = styled.p`
width: 150px;
`;