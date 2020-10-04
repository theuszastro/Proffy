import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, TouchableOpacity, Animated, Platform } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

import SucessAlert from '../components/Sucess';

import BackgroundImage from '../../assets/images/success-background.png';
import Logo from '../../assets/images/logo.png';
import BackImage from '../../assets/images/icons/back.png';

import { Container, Header, Background, ProffyLogo, ProffyDescription, Main, Form, Back, Title, Description, ContainerEmail, Email, DisableButton, ActiveButton, LabelDesactive, LabelActive } from './styles';

const Reset: React.FC = () => {
  const navi = useNavigation();

  const [OnSuccess, setOnSuccess] = useState(false);
  const [OnCorrect, setOnCorrect] = useState(false);
  const [AnimarEmail, setAnimarEmail] = useState(true);

  const [EmailTop] = useState(new Animated.Value(hp('3%')));
  const [EmailSize] = useState(new Animated.Value(hp('2.5%')));
  const [EmailState, setEmailState] = useState('');

  const MoveToUp = (Animar: boolean, top: Animated.Value, size: Animated.Value, setAnimar: any) => {
    if(Animar){
      Animated.timing(top, { toValue: hp('1.2%'), duration: 500, useNativeDriver: false }).start();
      Animated.timing(size, { toValue: hp('2.3%'), duration: 500, useNativeDriver: false }).start();

      setAnimar(false);
    }
  }
  
  const MoveToDefault = (state: string, top: Animated.Value, size: Animated.Value, setAnimar: any) => {
    if(state.length > 0)
      return;

    Animated.timing(top, { toValue: hp('3%'), duration: 500, useNativeDriver: false }).start();
    Animated.timing(size, { toValue: hp('2.5%'), duration: 500, useNativeDriver: false }).start();
      
    setAnimar(true);
  }

  useEffect(() => {
    if(EmailState.length == 0){
      setOnCorrect(false);

      return;
    }

    const [, zero] = EmailState.split('@');

    setOnCorrect(false);

    if(!zero)
      return;

    const [, one] = zero.split('.');

    if(!one)
      return;

    setOnCorrect(true);
  }, [EmailState])

  return (
    <>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.select({
          android: -15,
          ios: -15 
        })}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <Container>
            <StatusBar 
              style="light"
              backgroundColor="#774DD6"
              translucent
            />
      
            <Header>
              <Background source={BackgroundImage} resizeMode="contain" />

              <ProffyLogo source={Logo} resizeMode="contain" />

              <ProffyDescription>
                Sua Plataforma de {'\n'}
                estudos online.
              </ProffyDescription>
            </Header>

            <Main>
              <Form>
                <TouchableOpacity onPress={() => navi.navigate('Login')}>
                  <Back source={BackImage} />
                </TouchableOpacity>

                <Title>Esqueceu sua senha?</Title>

                <Description>
                  Não esquenta. {'\n'}
                  vamos dar um jeito nisso.
                </Description>

                <ContainerEmail>
                  <Email 
                    onChangeText={(text: string) => setEmailState(text)}
                    value={EmailState}
                    onFocus={() => MoveToUp(AnimarEmail, EmailTop, EmailSize, setAnimarEmail)}
                    onBlur={() => MoveToDefault(EmailState, EmailTop, EmailSize, setAnimarEmail)}
                  />

                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0
                    }}
                  >
                    <Animated.Text
                      style={{
                        position: 'absolute',
                        top: EmailTop,
                        left: 20,
                        fontSize: EmailSize,
                        fontFamily: 'Poppins_500Medium',
                        color: '#9C98A6'
                      }}
                    >
                      Email
                    </Animated.Text>
                  </TouchableOpacity>
                </ContainerEmail>

                {
                  OnCorrect? 
                    <ActiveButton onPress={() => {
                      Keyboard.dismiss();

                      setOnSuccess(true);
                    }}>
                      <LabelActive>Recuperar senha</LabelActive> 
                    </ActiveButton>
                  : 
                    <DisableButton>
                      <LabelDesactive>Recuperar senha</LabelDesactive>
                    </DisableButton>
                }
              </Form>
            </Main>
          </Container>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {
        OnSuccess? 
          <SucessAlert
            title="Redefinição|enviada!"
            description="Boa, agora é só checar o email que foi|enviado para você redefinir sua senha|e aproveitar os estudos."
            label="Voltar ao login"
            isReset={true}
            rota="Login"
          />
        : null
      }
    </>
  );
}

export default Reset;