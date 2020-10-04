import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';

import CheckImage from '../../../assets/images/icons/success-check-icon.png'

import { Container, Main, Check, Title, Description, Button, ButtonLabel } from './styles';

interface SucessProps {
    title: string;
    description: string;
    label: string;

    isReset: boolean;
    rota: string;
}

const SucessAlert: React.FC<SucessProps> = ({ title, description, label, isReset, rota }) => {
    const navi = useNavigation();
    
    const Navegar = () => {
        navi.navigate(`${rota}`)

        { isReset? navi.reset({ routes: [{ name: rota }] }) : null }
    }
    
    const TitleSplited = title.split('|');
    const DescriptionSplited = description.split('|');

    return (
        <Container>
            <StatusBar 
                backgroundColor="#774DD6"
                style="light"
                translucent
            />

            <Main>
                <Check source={CheckImage} />
                
                <Title>
                    { TitleSplited.map((item: string) => `${item} \n`) }
                </Title>

                <Description>
                    { DescriptionSplited.map((item: string) => `${item} \n`) }
                </Description>

                <Button onPress={() => Navegar()}>
                    <ButtonLabel>{label}</ButtonLabel>
                </Button>
            </Main>
        </Container>
    );
}

export default SucessAlert;