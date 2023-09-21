import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {motion} from 'framer-motion'
import {createGlobalStyle} from 'styled-components';


export const GlobalStyle = createGlobalStyle`
    body {
        background-color: ${props => props.theme.background};
        /* cursor: url('../icons8-spiderman-24.png'), auto; */
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme.text};

`

export const MotionStyled = motion(StyledLink)