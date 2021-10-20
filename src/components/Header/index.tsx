import React from 'react';
import { Link } from 'react-router-dom';
import logoSvg from '../../assets/logo.svg';
import {
    Container,
    Content,
    Logo
} from './styles';

export const Header: React.FC = () => {

    return (
        <Container>
            <Content>
                <Link to={'/'}>
                    <Logo src={logoSvg}></Logo>
                </Link>
            </Content>
        </Container>
    )
};
