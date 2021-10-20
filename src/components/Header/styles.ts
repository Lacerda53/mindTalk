import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    height: 5rem;
    background: var(--white);
    padding: 1rem;
    position: fixed;
    top: 0;
`;

export const Content = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    max-width: 1260px;
    padding: 0 1rem;
    margin: 0 auto;
    >button{
        background: transparent;
        border: 0;
    }
    #web{
        display: flex;
    }
    #mobile{
        display: none;
    }
    @media(max-width: 890px){
        #web{
            display: none;
        }
        #mobile{
            display: flex;
        }
    }
`;

export const Logo = styled.img`
    width: 160px;
    height: 100%;
    object-fit: contain;
`;
