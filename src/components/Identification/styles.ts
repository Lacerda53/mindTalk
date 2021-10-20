import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: calc(100vh - 8.3rem);
    background: var(--background);
    padding: 1rem;
    justify-content: center;
    align-items: center;
    padding-bottom: 10rem;
`;

export const GridRow = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 5rem;
    height: 100%;
    max-width: 1260px;
    margin: 0 auto;

    @media(max-width: 890px){
        grid-template-columns: 1fr;
    }
`;

export const Video = styled.video`
    width: 100%;
    height: auto;
`;

export const FromContainer = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: center;
    margin: 0 auto;

    @media(max-width: 890px){
        order: 2;
    }
`;

type InputContainerProps = {
    inputFocus: boolean;
};

export const InputContainer = styled.div<InputContainerProps>`
    margin-top: 2rem;
    padding: 1rem 0;
    border-bottom: ${props => props.inputFocus ? '2px solid var(--primary)': '2px solid var(--gray)'};
    width: 100%;
`;

export const Input = styled.input`
    width: 100%;
    height: 100%;
    font-size: 1rem;
    border: 0;
`;

export const Title = styled.h1`
    color: var(--secondary);
    font-size: 2rem;
`;