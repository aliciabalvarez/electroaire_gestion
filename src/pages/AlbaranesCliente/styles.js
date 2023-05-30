import styled from 'styled-components';


export const ModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
	background-color: #fff;
	padding: 20px;
	border-radius: 5px;
`;

export const ModalTitle = styled.h3`
	margin-top: 0;
`;

export const CloseButton = styled.button`
	margin-top: 10px;
`;
export const Title = styled.h1`
	font-size: 18px;
	color: #333;
	margin-bottom: 10px;
`;

export const Text = styled.p`
	font-size: 12px;
	color: #555;
	margin-bottom: 5px;
`;

export const TitleText = styled(Title)`
	margin-top: 50px;
`;

export const ClienteText = styled(Text)`
	font-weight: bold;
`;
