import React from 'react';
import { TouchableOpacity } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';

import BackImage from '../../../assets/images/icons/back.png';
import LogoImage from '../../../assets/images/logo.png';

import { Container, Header, SubHeader, Back, SubHeaderTitle, Logo, HeaderInfo, HeaderTitle, HeaderDescription, Main, Scroll, ContainerForm } from './styles';

const TeacherForm: React.FC = () => {
    const navi = useNavigation();

    return (
        <Container>
            <StatusBar backgroundColor="#6842C2" style="light" translucent />

            <Header>
                <SubHeader>
                    <TouchableOpacity onPress={() => navi.navigate('Home')}>
                        <Back source={BackImage} resizeMode="contain" />
                    </TouchableOpacity>

                    <SubHeaderTitle>Dar aulas.</SubHeaderTitle>

                    <Logo source={LogoImage} resizeMode="contain" />
                </SubHeader>

                <HeaderInfo>
                    <HeaderTitle>
                        Meus proffys {'\n'}
                        Favoritos.
                    </HeaderTitle>

                    <HeaderDescription>
                        O primeiro passo, é preencher esse {'\n'}
                        formulario de inscrição.
                    </HeaderDescription>
                </HeaderInfo>
            </Header>

            <Main>
                <Scroll>
                    <ContainerForm>
                        

                    </ContainerForm>
                </Scroll>
            </Main>
        </Container>
    );
}

export default TeacherForm;