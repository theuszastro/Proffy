import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../../../context';

import BackImage from '../../../assets/images/icons/back.png';
import LogoImage from '../../../assets/images/logo.png';
import Emoji from '../../../assets/images/icons/smile.png';

import TeacherItem from '../../components/TeacherItem';

import { Container, Header, SubHeader, Back, SubHeaderTitle, Logo, HeaderInfo, HeaderTitle, Row, Carinha, Label, Main, Scroll } from './styles';

const Favorited: React.FC = () => {
  const navi = useNavigation();
  const { Favorites } = useFavorites();

  const [FavoritedLength, setFavoritedLength] = useState(0);

  useEffect(() => {
    setFavoritedLength(Favorites?.length || 0);
  }, [Favorites])

  return (
    <Container>
      <StatusBar backgroundColor="#6842C2" style="light" translucent />

      <Header>
        <SubHeader>
          <TouchableOpacity onPress={() => navi.navigate('Home')}>
            <Back source={BackImage} resizeMode="contain" />
          </TouchableOpacity>

          <SubHeaderTitle>Estudar</SubHeaderTitle>

          <Logo source={LogoImage} resizeMode="contain" />
        </SubHeader>

        <HeaderInfo>
          <HeaderTitle>
            Meus proffys {'\n'}
            Favoritos.
          </HeaderTitle>

          <Row>
            <Carinha source={Emoji} resizeMode="contain" />

            <Label>{FavoritedLength} {FavoritedLength <= 1? 'proffy' : 'proffys'}</Label>
          </Row>
        </HeaderInfo>
      </Header>

      <Main>
        <Scroll>
          {
            Favorites && Favorites.map((item) => {
              return (
                <TeacherItem 
                  key={item.id}
                  Teacher={item}
                  isFavorite={true}
                />
              )
            })
          }
        </Scroll>
      </Main>
    </Container>
  );
}

export default Favorited;