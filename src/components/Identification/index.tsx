import React, { FormEvent, MutableRefObject, useState } from 'react';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import { ButtonContainer } from '../../pages/Home/styles';
import { ButtonMain } from '../Button';
import {
    Container,
    FromContainer,
    GridRow,
    Input,
    InputContainer,
    Title,
    Video
} from './styles';

type Props = {
    startCall: (username: string, userToCall: string) => Promise<void>;
    onLogin: (username: string) => Promise<void>;
    loading: boolean;
    localVideoRef: MutableRefObject<HTMLVideoElement | null>;
};

export const Identification: React.FC<Props> = ({
    startCall,
    onLogin,
    loading,
    localVideoRef
}) => {
    const [username, setUsername] = useState<string>('');
    const [inputFocus, setOnFocus] = useState<boolean>(false);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const idRoom = window.location.pathname.split('/')[1];

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        setLoadingSubmit(true);
        await onLogin(username);
        await startCall(username, idRoom);
        setLoadingSubmit(false)
    }

    return (
        <Container>
            <GridRow>
                <Video ref={localVideoRef} autoPlay muted playsInline />
                <FromContainer onSubmit={handleSubmit}>
                    {loading ? (
                        <Title>Carregando...</Title>
                    ) : (
                        <>
                            <Title>
                                Pronto para participar?
                            </Title>
                            <InputContainer inputFocus={inputFocus}>
                                <Input
                                    value={username}
                                    placeholder='Digite seu nome'
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={() => setOnFocus(true)}
                                    onBlur={() => setOnFocus(false)}
                                />
                            </InputContainer>
                            <ButtonContainer>
                                <ButtonMain type='submit' disabled={loadingSubmit && !username ? true : false}>
                                    {loadingSubmit ? 'Carregando...' : (
                                        <>
                                            <MdOutlinePeopleAlt size='1.2rem' className='icon' />
                                            Participar agora
                                        </>
                                    )}
                                </ButtonMain>
                            </ButtonContainer>
                        </>
                    )}
                </FromContainer>
            </GridRow>
        </Container>
    );
};