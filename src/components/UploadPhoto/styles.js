import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledUl = styled.ul`
	display: flex;
	justify-content: space-around;
`;
const StyledLi = styled.li`
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
export { StyledLi, StyledLink, StyledUl };
