import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { Container, Text } from './styles';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    outline?: boolean;
    children: ReactNode;
}

export const ButtonMain: React.FC<Props> = ({ children, outline = false, ...rest }) => {
    return (
        <Container outline={outline}  {...rest}>
            <Text>
                {children}
            </Text>
        </Container>
    );
};