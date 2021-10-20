import styled from 'styled-components';

type ContainerProps = {
    outline?: boolean;
};

export const Container = styled.button<ContainerProps>`
    background: ${props => props.outline ? 'transparent' : 'var(--primary)'};
    color: ${props => props.outline ? 'var(--primary)' : 'var(--white)'};
    border: ${props => props.outline ? '1px solid var(--primary)' : 0};
    padding: 1.2rem 2rem;
    border-radius: .5rem;
    transition: .3s;

    &:hover{
        filter: brightness(.9);
    }

    .icon {
        margin-right: 1rem;
        color: var(--white);
    }
`;

export const Text = styled.div<ContainerProps>`
    font-weight: 500;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;