import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import { useProfile } from '../../context';

import Ilustration from '../../assets/images/landing.png';
import EstudarImage from '../../assets/images/icons/study.png';
import DarAulasImage from '../../assets/images/icons/give-classes.png';
import CoracaoRoxo from '../../assets/images/icons/purple-heart.png';

import AntDesign from 'react-native-vector-icons/AntDesign';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

import { Container, Header, Profile, UserDetails, UserImage, UserNome, Logout, Rotate, ProffyIlustration, Main, Title, Description, Actions, Estudar, EstudarIcon, DarAulas, DarAulasIcon, Label, Info, Total, Corazom } from './styles';

const Home: React.FC = () => {
  const { User, setUser } = useProfile();
  const navi = useNavigation();
  
  const [Connections, setConnections] = useState(0);

  const LogoutCall = async () => {
    await AsyncStorage.removeItem('token');

    navi.navigate('Login');
  }

  useEffect(() => {
    const getConnections = async () => {
      try {
        const Connect = await api.get('/connections');

        setConnections(Connect.data.total);

      } catch (err) {
        setTimeout(async () => {
          await getConnections();
        })
      }
    } 

    const getUserId = async () => {
      const Token = await AsyncStorage.getItem('token');

      try {
        const UserId = await api.get('/auth', {
          headers: {
            'authorization': `Bearer ${Token}`
          }
        });

        return UserId.data.id;
      } catch (err) {
        setTimeout(() => {
          navi.navigate('Login');
        }, 2000)
      }
    }

    const getUser = async () => {
      const Token = await AsyncStorage.getItem('token');

      try {
        const id = await getUserId();

        const Dados = await api.get(`/user/${id}`, {
          headers: {
            'authorization': `Bearer ${Token}`
          }
        });

        setUser(Dados.data.User[0]);
      } catch (err) {
        await getUser();
      }
    }

    if(!User) {
      getUser();
    }

    getConnections();
  }, [])

  return(
    <Container>
      <StatusBar 
        style="light"
        backgroundColor="#774DD6"
        translucent
      />

      <Header>
        <Profile>
          <UserDetails>
            <UserImage source={{ uri: User?.photo }} /> 
            <UserNome>{!User?.nome? 'Buscando dados..' : `${User?.nome} ${User?.sobrenome}` }</UserNome>
          </UserDetails>

          <Logout onPress={async () => await LogoutCall()}> 
            <Rotate>
              <AntDesign name="logout" size={20} color="#FFF" />
            </Rotate>
          </Logout>
        </Profile>

        <ProffyIlustration source={Ilustration} resizeMode="contain" />
      </Header>

      <Main>
        <Title>Seja bem-vindo.</Title>
        <Description>O que deseja fazer?</Description>

        <Actions>
          <Estudar onPress={() => navi.navigate('Study')}>
            <EstudarIcon source={EstudarImage} />

            <Label>Estudar</Label>
          </Estudar>

          <DarAulas>
            <DarAulasIcon source={DarAulasImage} />
          
            <Label>Dar aulas</Label>
          </DarAulas>
        </Actions>

        <Info>
          <Total>
            Total de {Connections} conexões {'\n'}
            já realizadas <Corazom source={CoracaoRoxo} resizeMode="contain" />
          </Total>
        </Info>
      </Main>
    </Container>
  );
}

export default Home;