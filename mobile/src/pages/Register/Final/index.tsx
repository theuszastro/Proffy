import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Platform, Animated } from 'react-native';

import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import { useRegister } from '../../../context';

import Feather from 'react-native-vector-icons/Feather';

import SuccessAlert from '../../components/Sucess';

import BackImage from '../../../assets/images/icons/back.png';
import api from '../../../services/api';

import { Container, Header, Back, Sections, SectionActive, SectionDesactive, Main, Title, Description, Form, Subtitle, ContainerEmail, Email, ContainerPassword, Password, ButtonActive, ButtonDesactive, LabelActive, LabelDesactive } from './styles';

const RegisterFinal: React.FC = () => {
  const navi = useNavigation();
  const { Dados } = useRegister();

  const [Label, setLabel] = useState('Concluir cadastro');

  const [OnSucess, setOnSucess] = useState(false);
  const [Secure, setSecure] = useState(false);
  const [OnButtonActive, setOnButtonActive] = useState(false);
  
  const [AnimarEmail, setAnimarEmail] = useState(true);
  const [AnimarPassword, setAnimarPassword] = useState(true);

  const [EmailTop] = useState(new Animated.Value(hp('3%')));
  const [EmailSize] = useState(new Animated.Value(hp('2.5%')));

  const [PasswordTop] = useState(new Animated.Value(hp('3%')));
  const [PasswordSize] = useState(new Animated.Value(hp('2.5%')));

  const [EmailState, setEmailState] = useState('');
  const [PasswordState, setPasswordState] = useState('');

  const MoveToUp = (Animar: boolean, top: Animated.Value, size: Animated.Value, setAnimar: any) => {
    if(Animar){
      Animated.timing(top, { toValue: hp('1.3%'), duration: 500, useNativeDriver: false }).start();
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

  const CreateRequest = async () => {
    try {
      setLabel('Aguarde...');

      const UserCreated = await api.post('/register', {
        nome: Dados?.nome,
        sobrenome: Dados?.sobrenome,
        photo: Dados?.foto,
        email: EmailState.toLowerCase(),
        password: PasswordState
      });

      setLabel('Cadastro concluido!');

      setOnSucess(true);
    } catch (err) {
      setLabel('Algo deu errado!');
    }
  }

  useEffect(() => {
    if(EmailState.length == 0){
      setOnButtonActive(false);

      return;
    }

    setOnButtonActive(false);
    
    const [, zero] = EmailState.split('@');

    if(!zero)
      return;

    const [, one] = zero.split('.');

    if(!one)
      return;

    if(!PasswordState)
      return;

    if(PasswordState.length < 5)
      return;

    setOnButtonActive(true);
  }, [EmailState, PasswordState])

  return (
    <>
      <Container>
        <StatusBar 
          backgroundColor="#F0F0F7"
          style="dark"
          translucent
        />

        <Header>
          <TouchableOpacity onPress={() => navi.navigate('RegisterInicio')}>
            <Back source={BackImage}  />
          </TouchableOpacity>

          <Sections>
            <SectionDesactive />
            <SectionActive />
          </Sections>
        </Header>

        <Main>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={Platform.select({
              ios: 150,
              android: 110
            })}
          >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <>
                <Title> 
                  Sua Conta está {'\n'}
                  quase pronta!
                </Title>

                <Description>
                  Falta preencher esses dados {'\n'}
                  e você estará um passo a finalizar.
                </Description>
                
                <Form>
                  <Subtitle>02. Email e Senha</Subtitle>

                  <ContainerEmail>
                    <Email
                      keyboardType="visible-password"
                      value={EmailState}
                      onChangeText={text => setEmailState(text)}
                      onFocus={() => MoveToUp(AnimarEmail, EmailTop, EmailSize, setAnimarEmail)}
                      onBlur={() => MoveToDefault(EmailState, EmailTop, EmailSize, setAnimarEmail)}
                    />

                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0
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

                  <ContainerPassword>
                    <Password
                      value={PasswordState}
                      onChangeText={text => setPasswordState(text)}
                      secureTextEntry={Secure? false : true}
                      onFocus={() => MoveToUp(AnimarPassword, PasswordTop, PasswordSize, setAnimarPassword)}
                      onBlur={() => MoveToDefault(PasswordState, PasswordTop, PasswordSize, setAnimarPassword)}
                    />

                    {
                      Secure? 
                        <Feather 
                          name="eye-off" 
                          color="#6842C2"
                          size={hp('4.2%')}
                          onPress={() => setSecure(!Secure)} 
                        /> 
                      : 
                        <Feather 
                          name="eye" 
                          color="rgba(0, 0, 0, .4)"
                          size={hp('4.2%')}
                          onPress={() => setSecure(!Secure)} 
                        />
                    }

                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0
                      }}
                    >
                      <Animated.Text
                        style={{
                          position: 'absolute',
                          top: PasswordTop,
                          left: 20,
                          fontSize: PasswordSize,
                          fontFamily: 'Poppins_500Medium',
                          color: '#9C98A6'
                        }}
                      >
                        Senha
                      </Animated.Text>
                    </TouchableOpacity>
                  </ContainerPassword>

                  {
                    OnButtonActive?
                      <ButtonActive onPress={() => CreateRequest()}>
                        <LabelActive>
                          {Label}
                        </LabelActive>
                      </ButtonActive>
                    :
                      <ButtonDesactive>
                        <LabelDesactive>
                          {Label}
                        </LabelDesactive>
                      </ButtonDesactive>
                  }
                </Form>
              </>
            </TouchableWithoutFeedback> 
          </KeyboardAvoidingView>
        </Main>
      </Container>
    
      {
        OnSucess? 
          <SuccessAlert 
            title="Cadastro|concluído!"
            description="Agora você faz parte da|plataforma da Proffy"
            label="Fazer login"
            isReset={true}
            rota="Login"
          /> 
        : null
      }
    </>
  );
}

export default RegisterFinal; 