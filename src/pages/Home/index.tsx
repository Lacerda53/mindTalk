import React from 'react';
import apresentatioImg from '../../assets/apresentation.svg';
import { ButtonMain } from '../../components/Button';
import { MdOutlinePeopleAlt } from 'react-icons/md';
import shortid from 'shortid';
import {
    Container,
    GridRow,
    ImageContainer,
    Image,
    ContentContainer,
    Title,
    Subtitle,
    ButtonContainer
} from './styles';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
    const uid = shortid.generate();

    return (
        <Container>
            <GridRow>
                <ContentContainer>
                    <Title>
                        Videochamadas técnicas com pacientes.
                    </Title>
                    <Subtitle>
                        O melhor serviço de telepsicologia do Brasil, mais completo, minimalista e simples para seu dia dia.
                    </Subtitle>
                    <ButtonContainer>
                        <Link to={{
                            pathname: `/${uid}`,
                            state: { isCreator: true }
                        }}>
                            <ButtonMain>
                                <MdOutlinePeopleAlt size='1.2rem' className='icon' />
                                Nova Consulta
                            </ButtonMain>
                        </Link>
                    </ButtonContainer>
                </ContentContainer>
                <ImageContainer>
                    <Image src={apresentatioImg} />
                </ImageContainer>
            </GridRow>
        </Container>
    );
}