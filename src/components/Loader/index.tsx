import React from 'react';
import { Container } from './styles';

export const Loader: React.FC = () => {
    return (
        <Container>
            <h2>Configurando sua conexão...</h2>
            <p>Por favor, aguarde</p>
            <div className="lds-ellipsis"><div></div><div></div><div></div></div>
        </Container>
    );
};