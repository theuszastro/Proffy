import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Header, Main, Background, StudyIcon, Proxima, Numero, Label, Footer, Sections, SectionActive, SectionDesactive, Next } from './styles';

import BackgroundImage from '../../../assets/images/success-background.png';
import StudyImage from '../../../assets/images/icons/study.png';
import Seta from '../../../assets/images/icons/back.png';

const Study: React.FC = () => {
  const navi = useNavigation();

  return (
    <Container>
      <Header>
        <Background source={BackgroundImage} resizeMode="contain" />

        <StudyIcon source={StudyImage} resizeMode="contain" />
      </Header>

      <Main>
        <Numero>01. {'\n'} </Numero>
      
        <Label>
          Encontre vários {'\n'}
          professores para {'\n'}
          ensinar você
        </Label> 
      </Main>

      <Footer>
        <Sections>
          <SectionActive />

          <SectionDesactive  /> 
        </Sections>

        <Next onPress={() => navi.navigate('OnboardingProffy')}>
          <Proxima source={Seta} resizeMode="contain" />
        </Next>
      </Footer>
    </Container>
  );
}

export default Study;