import styled from 'styled-components';

export const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const ModalContent = styled.div`
	background-color: white;
	padding: 20px;
	border-radius: 4px;
`;

export const CloseButton = styled.span`
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
`;

// Agrega otros estilos según sea necesario
