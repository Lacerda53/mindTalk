import React from 'react';
import { Container } from './styles';

export const Footer: React.FC = () => {
    return (
        <Container>
            <div>© Copyright {new Date().getFullYear()} - Mind Talk - Todos os direitos reservados</div>
        </Container>
    );
};