import styled from 'styled-components';

const ContenedorLogin = styled.div`
	text-align: center;
	margin: auto;
	width: 500px;
	margin-top: 10vh;
	position: absolute;
    left: 25%;
`;
const StyledImg = styled.img`
	width: 50px;
`;
const TitleH1Login = styled.h1`
	font-weight: 200;
	font-size: 30px;
`;
const TitleH3Login = styled.h3`
	font-weight: 100;
	font-size: 17px;
	margin-bottom: 5vh;
`;
const FormLogin = styled.form`
	width: 300px;
	margin: auto;
`;
const InputMailLogin = styled.input`
	width: 260px;
	padding: 10px 20px;
	border: none;
	border-radius: 50px;
	margin-bottom: 10px;
`;
const InputPassLogin = styled.input`
	width: 260px;
	padding: 10px 20px;
	border: none;
	border-radius: 50px;
`;
const ForgetPassLogin = styled.p`
	text-align: right;
`;
const ForgetPassLoginA = styled.a`
	font-size: 13px;
	color: #a0c11d;
`;
const EnterLogin = styled.input`
	width: 300px;
	padding: 10px 20px;
	border: none;
	border-radius: 10px;
	background-color: #a0c11d;
	margin-top: 25px;
	font-size: 16px;
	font-weight: 600;
	color: white;
`;
const BtnGoogleLogin = styled.button`
	width: 220px;
	padding: 8px 20px;
	border: none;
	border-radius: 7px;
	background-color: white;
	display: flex;
	color: rgb(26, 26, 159);
	align-items: center;
	justify-content: center;
	margin: auto;
	margin-top: 14px;
`;
const StyledImgGoogle = styled.img`
	width: 20px;
	margin-right: 10px;
`;

export {
	ContenedorLogin,
	StyledImg,
	TitleH1Login,
	TitleH3Login,
	FormLogin,
	InputMailLogin,
	InputPassLogin,
	ForgetPassLogin,
	ForgetPassLoginA,
	EnterLogin,
	BtnGoogleLogin,
	StyledImgGoogle
};
