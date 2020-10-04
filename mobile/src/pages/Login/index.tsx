import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Platform, Keyboard, Animated, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import BackgroundImage from '../../assets/images/success-background.png';
import Logo from '../../assets/images/logo.png';

import AsyncStorage from '@react-native-community/async-storage';
import { useProfile } from '../../context';
import api from '../../services/api';

import { 
  Container, Header, Background, ProffyLogo, ProffyDescription, Main, Form, Row, Title, CreateAccount, Email, Password,
  CheckBox, DisableSubmit, ActiveSubmit, ResetPassword, ContainerEmail, ContainerPassword, ActiveCheckBox, Label, LabelRegister, 
  LabelActive, Box, Lembrar, LabelDesactive
} from './styles';

const Login: React.FC = () => {
  const { setUser } = useProfile();

  const [OnCorrect, setOnCorrect] = useState(false);
  const [Checked, setChecked] = useState(false);
  const [Secure, setSecure] = useState(false);

  const [AnimarEmail, setAnimarEmail] = useState(true);
  const [AnimarPassword, setAnimarPassword] = useState(true);

  const [LabelButton, setLabelButton] = useState('Fazer Login');
  const [EmailState, setEmailState] = useState('');
  const [PasswordState, setPasswordState] = useState('');

  const [EmailTop] = useState(new Animated.Value(hp('2.5%')));
  const [EmailSize] = useState(new Animated.Value(hp('2.5%')));
  const [PasswordTop] = useState(new Animated.Value(hp('2.5%')));
  const [PasswordSize] = useState(new Animated.Value(hp('2.5%')));

  const navi = useNavigation();

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

    Animated.timing(top, { toValue: hp('2.5%'), duration: 500, useNativeDriver: false }).start();
    Animated.timing(size, { toValue: hp('2.5%'), duration: 500, useNativeDriver: false }).start();
      
    setAnimar(true);
  }

  const SubmitLogin = async () => {
    try {
      Keyboard.dismiss();
      
      setLabelButton('Aguarde...');

      const Submit: any = await api.post('/login', {
        email: EmailState.toLowerCase(),
        password: PasswordState,
        expiresIn: Checked? '9999' : '1d'
      });

      const Token = await AsyncStorage.getItem('token');
      
      if(Token)
        await AsyncStorage.removeItem('token');
      
      await AsyncStorage.setItem('token', Submit.data.token);
  
      const FindUser: any = await api.get(`/user/${Submit.data.id}`, {
        headers: {
          'authorization': `Bearer ${Submit.data.token}`
        }
      })

      setUser(FindUser.data.User[0]);

      setLabelButton('Login Feito!');

      setTimeout(() => {
        navi.navigate('Home');

        navi.reset({
          routes: [{ name: 'Home'}]
        });
      }, 4000)
    } catch (err) {
      setLabelButton('Algo deu errado!');
    }
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

    if(!PasswordState)
      return;

    if(PasswordState.length < 5)
      return;

    setOnCorrect(true);
  }, [EmailState, PasswordState])

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ ios: -20, android: 0 })}
      behavior="position"
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <StatusBar 
            backgroundColor="#774DD6"
            style="light"
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
              <Row>
                <Title>Fazer Login</Title>
                
                <CreateAccount onPress={() => navi.navigate('RegisterInicio')}>
                  <LabelRegister>
                    Criar uma conta
                  </LabelRegister>
                </CreateAccount>
              </Row>
 
              <ContainerEmail>
                <Email
                  keyboardType="visible-password"
                  onChangeText={(text: string) => setEmailState(text)}
                  value={EmailState}
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
              </ContainerPassword>

              <Row>
                <Box>
                  {
                    Checked? 
                      <ActiveCheckBox onPress={() => setChecked(!Checked)}>
                        <AntDesign name="check" size={15} color="#FFF" />
                      </ActiveCheckBox>
                    : 
                      <CheckBox onPress={() => setChecked(!Checked)} />
                  }

                  <Lembrar>Lembrar-me</Lembrar>
                </Box>

                <ResetPassword onPress={() => navi.navigate('Reset')}>
                  <Label>
                    Esqueci minha senha
                  </Label>
                </ResetPassword>
              </Row>

              {
                OnCorrect? 
                  <ActiveSubmit onPress={SubmitLogin}>
                    <LabelActive>{LabelButton}</LabelActive> 
                  </ActiveSubmit>
                : 
                  <DisableSubmit>
                    <LabelDesactive>{LabelButton}</LabelDesactive>
                  </DisableSubmit>
              }
            </Form>
          </Main>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Login;