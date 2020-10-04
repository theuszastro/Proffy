import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

import { Container, Header, Main, Background, ProffyIcon, Proxima, Numero, Label, Footer, Sections, SectionActive, SectionDesactive, Next } from './styles';

import BackgroundImage from '../../../assets/images/success-background.png';
import ProffyImage from '../../../assets/images/icons/give-classes.png';
import Seta from '../../../assets/images/icons/back.png';

import AsyncStorage from '@react-native-community/async-storage';

const Proffy: React.FC = () => {
  const navi = useNavigation();

  return (
    <Container>
      <StatusBar backgroundColor="#04D361" style="dark" />

      <Header>
        <Background 
          source={BackgroundImage} 
          resizeMode="contain"   
        />

        <ProffyIcon source={ProffyImage} resizeMode="contain" />
      </Header>

      <Main>
        <Numero>02. {'\n'} </Numero>
      
        <Label>
          Ou dê aulas {'\n'}
          sobre oque você {'\n'}
          mais conhece
        </Label> 
      </Main>

      <Footer>
        <Sections>
          <SectionDesactive  />

          <SectionActive />
        </Sections>

        <Next onPress={async () => {
          await AsyncStorage.removeItem('onFirst');
          await AsyncStorage.setItem('onFirst', 'false');

          navi.navigate('Login');

          navi.reset({
            routes: [{ name: 'Login' }]
          })
        }}>
          <Proxima source={Seta} resizeMode="contain" />
        </Next>
      </Footer>
    </Container>
  );
}

export default Proffy;