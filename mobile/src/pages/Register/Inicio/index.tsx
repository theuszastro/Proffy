import React, { useState, useEffect } from 'react';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { KeyboardAvoidingView, TouchableWithoutFeedback, TouchableOpacity, Keyboard, Platform, Animated } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import { useRegister } from '../../../context';

import BackImage from '../../../assets/images/icons/back.png';

import { Container, Header, Back, Sections, SectionActive, SectionDesactive, Main, Title, Description, Form, Subtitle, ContainerNome, Nome, ContainerSobrenome, Sobrenome, ContainerFoto, Foto, ButtonActive, ButtonDesactive, LabelActive, LabelDesactive } from './styles';

const RegisterInicio: React.FC = () => {
  const navi = useNavigation();
  const { setDados } = useRegister();

  const [OnButtonActive, setOnButtonActive] = useState(false);
  
  const [AnimarNome, setAnimarNome] = useState(true);
  const [AnimarSobrenome, setAnimarSobrenome] = useState(true);
  const [AnimarFoto, setAnimarFoto] = useState(true);

  const [NomeTop] = useState(new Animated.Value(hp('3%')));
  const [NomeSize] = useState(new Animated.Value(hp('2.5%')));

  const [SobrenomeTop] = useState(new Animated.Value(hp('3%')));
  const [SobrenomeSize] = useState(new Animated.Value(hp('2.5%')));

  const [FotoTop] = useState(new Animated.Value(hp('3%')));
  const [FotoSize] = useState(new Animated.Value(hp('2.5%')));

  const [NomeState, setNomeState] = useState('');
  const [SobrenomeState, setSobrenomeState] = useState('');
  const [FotoState, setFotoState] = useState('');

 
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

  const NextStage = () => {
    setDados({
      nome: NomeState,
      sobrenome: SobrenomeState,
      foto: FotoState
    });

    navi.navigate('RegisterFinal');
  }

  useEffect(() => {
    if(NomeState.length == 0 || SobrenomeState.length == 0 || FotoState.length == 0){
      setOnButtonActive(false);

      return;
    }

    setOnButtonActive(true);
  }, [NomeState, SobrenomeState, FotoState])

  return (
    <Container>
      <StatusBar 
        backgroundColor="#F0F0F7"
        style="dark"
        translucent
      />

      <Header>
        <TouchableOpacity onPress={() => navi.navigate('Login')}>
          <Back source={BackImage}  />
        </TouchableOpacity>

        <Sections>
          <SectionActive />
          <SectionDesactive />
        </Sections>
      </Header>

      <Main>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={Platform.select({
            ios: 130,
            android: 130
          })}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <Title>
                Crie sua {'\n'}
                conta gratuita
              </Title>

              <Description>
                Basta preencher esses dados {'\n'}
                e você estará conosco
              </Description>

              <Form>
                <Subtitle>01. Quem é você?</Subtitle>
                
                <ContainerNome>
                  <Nome 
                    onChangeText={text => setNomeState(text)}
                    value={NomeState}
                    onFocus={() => MoveToUp(AnimarNome, NomeTop, NomeSize, setAnimarNome)}
                    onBlur={() => MoveToDefault(NomeState, NomeTop, NomeSize, setAnimarNome)}
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
                        top: NomeTop,
                        left: 20,
                        fontSize: NomeSize,
                        fontFamily: 'Poppins_500Medium',
                        color: '#9C98A6'
                      }}
                    >
                      Nome
                    </Animated.Text>
                  </TouchableOpacity>
                </ContainerNome>

                <ContainerSobrenome>
                  <Sobrenome
                    value={SobrenomeState}
                    onChangeText={text => setSobrenomeState(text)}
                    onFocus={() => MoveToUp(AnimarSobrenome, SobrenomeTop, SobrenomeSize, setAnimarSobrenome)}
                    onBlur={() => MoveToDefault(SobrenomeState, SobrenomeTop, SobrenomeSize, setAnimarSobrenome)}
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
                        top: SobrenomeTop,
                        left: 20,
                        fontSize: SobrenomeSize,
                        fontFamily: 'Poppins_500Medium',
                        color: '#9C98A6'
                      }}
                    >
                      Sobrenome
                    </Animated.Text>
                  </TouchableOpacity>
                </ContainerSobrenome>

                <ContainerFoto>
                  <Foto 
                    value={FotoState}
                    onChangeText={text => setFotoState(text)}
                    onFocus={() => MoveToUp(AnimarFoto, FotoTop, FotoSize, setAnimarFoto)}
                    onBlur={() => MoveToDefault(FotoState, FotoTop, FotoSize, setAnimarFoto)}
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
                        top: FotoTop,
                        left: 20,
                        fontSize: FotoSize,
                        fontFamily: 'Poppins_500Medium',
                        color: '#9C98A6'
                      }}
                    >
                      Foto
                    </Animated.Text>
                  </TouchableOpacity>
                </ContainerFoto>

                {
                  OnButtonActive?
                    <ButtonActive onPress={() => NextStage()}>
                      <LabelActive>
                        Proxima
                      </LabelActive>
                    </ButtonActive>
                  :
                    <ButtonDesactive>
                      <LabelDesactive>
                        Proxima
                      </LabelDesactive>
                    </ButtonDesactive>
                }
              </Form>
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Main>
    </Container>
  );
}

export default RegisterInicio;