import styled from 'styled-components';

export const Container = styled.section`
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
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    height: 100%;
    max-width: 1260px;
    margin: 0 auto;

    @media(max-width: 890px){
        grid-template-columns: 1fr;
    }
`;

export const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 80%;
    height: 100%;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    @media(max-width: 890px){
        order: 2;
    }
`;

export const Title = styled.h1`
    color: var(--secondary);
    font-size: 3rem;
`;

export const Subtitle = styled.h5`
    font-size: 1.5rem;
    font-weight: 300;
    margin-top: 3rem;
    color: var(--base);
`;

export const ImageContainer = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    margin: 0 auto;

    @media(max-width: 890px){
        order: 1;
    }
`;

export const Image = styled.img`
    width: 100%;
    object-fit: contain;
`;

export const ButtonContainer = styled.div`
    display: flex;
    margin-top: 3rem;
    align-self: flex-start;
`;