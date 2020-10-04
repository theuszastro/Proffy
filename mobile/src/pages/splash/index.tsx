import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { useProfile } from '../../context';
import { useNavigation } from '@react-navigation/native';

import { Container, Background, Center, ProffyLogo, ProffySlogan, Rotate } from './styles';
 
import Logo from '../../assets/images/logo.png';
import BackgroundImage from '../../assets/images/success-background.png';

import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';

const Splash: React.FC = () => {
  const navi = useNavigation();  

  const { setUser } = useProfile();

  useEffect(() => {
    const Execute = async () => {
      const onFirst = await AsyncStorage.getItem('onFirst');
      const Token = await AsyncStorage.getItem('token');

      if(!onFirst){
        await AsyncStorage.setItem('onFirst', 'true');

        setTimeout(() => {
          navi.reset({ 
            routes: [{ name: 'OnboardingStudy' }]
          })

          navi.navigate('OnboardingStudy');
        }, 4000);

        return;
      }

      if(onFirst === 'true'){
        setTimeout(() => {
          navi.reset({ 
            routes: [{ name: 'OnboardingStudy' }]
          })
          
          navi.navigate('OnboardingStudy');
        }, 4000);

        return;
      }
 
      if(onFirst === 'false'){
        if(Token){
          try { 
            const UserId = await api.get('/auth', {
              headers: {
                'authorization': `Bearer ${Token}`
              }
            })

            console.log(UserId.data);
            
            const FindUser = await api.get(`/user/${UserId.data.id}`, {
              headers: {
                'authorization': `Bearer ${Token}`
              }
            })

            setUser(FindUser.data.User[0]);

            console.log(FindUser.data);

            setTimeout(() => {
              navi.navigate('Home');

              navi.reset({
                routes: [{ name: 'Home'}]
              });
            }, 4000);

            return;
          } catch (err) {
            setTimeout(() => {
              navi.navigate('Login');

              navi.reset({
                routes: [{ name: 'Login'}]
              });
            }, 4000);    
          }
        }

        setTimeout(() => {
          navi.navigate('Login'); 

          navi.reset({
            routes: [{ name: 'Login'}]
          });
        }, 4000);
      }
    }

    // (async () => await Execute())();

    (() => { navi.navigate('Teacher') })();

  }, [])

  return (
    <Container>
      <StatusBar 
        style="light"
        backgroundColor="#774DD6"
        translucent
      />

      <Rotate>
        <Background source={BackgroundImage} resizeMode="contain" />
      </Rotate>

      <Center>
        <ProffyLogo source={Logo} resizeMode="contain" />

        <ProffySlogan>
          Sua plataforma de {'\n'}
          estudos online.
        </ProffySlogan>
      </Center>
    </Container>
  );
}

export default Splash;