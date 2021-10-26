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
    margin: 0 auto;
`;

export const LocalContainer = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 200px;
`;

export const RemoteContainer = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 12rem);
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const VideoLocal = styled.video`
    width: 200px;
    height: 200px;
`;

export const VideoRemote = styled.video`
    width: auto;
    height: calc(100vh - 10rem);
`;

export const Label = styled.label`
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: capitalize;
`;

export const Canvas = styled.canvas`
    position: absolute;
    height: calc(100vh - 12rem);
    justify-self: center;
    align-self: center;
`;
