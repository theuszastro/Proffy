import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';

import { TeacherProps } from '../../Teacher/TeacherList';
import { useFavorites } from '../../../context';

import SetaImage from '../../../assets/images/icons/back.png';
import WhatsAppImage from '../../../assets/images/icons/whatsapp.png';

import FavoriteIcon from '../../../assets/images/icons/Favorite.png';
import UnFavoriteIcon from '../../../assets/images/icons/unFavorite.png';

import api from '../../../services/api';

import AsyncStorage from '@react-native-community/async-storage';

import { Container, Header, Profile, UserImage, ProfileInfo, UserNome, UserSubject, Main, ProffyInfo, Bio, ContainerData, Separator, Label, ActiveData, LabelData, Seta, DisabledData, Footer, FooterInfo, LabelFooter, Valor, Buttons, UnFavorited, Favorite, FavoritedIcon, Whats, WhatsIcon, LabelButton } from './styles';

interface TeacherItemProps {
  Teacher: TeacherProps;
  isFavorite: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ Teacher, isFavorite }) => {
  const user = Teacher.proffy.user;

  const { setFavorites, FavoritesIds, setFavoritesIds } = useFavorites();

  const [OnFavorite, setOnFavorite] = useState(isFavorite);

  const [Segunda, setSegunda] = useState(false);
  const [Terca, setTerca] = useState(false);
  const [Quarta, setQuarta] = useState(false);
  const [Quinta, setQuinta] = useState(false);
  const [Sexta, setSexta] = useState(false);
  
  const [SegundaLabel, setSegundaLabel] = useState('');
  const [TercaLabel, setTercaLabel] = useState('');
  const [QuartaLabel, setQuartaLabel] = useState('');
  const [QuintaLabel, setQuintaLabel] = useState('');
  const [SextaLabel, setSextaLabel] = useState('');

  const ChangeFavorite = async () => {
    const FavoritesLocal = await AsyncStorage.getItem('favorites');

    let favoritesArray: TeacherProps[] = [];
    let isIdFavorites: number[] = [];

    if(FavoritesLocal)
      favoritesArray = JSON.parse(FavoritesLocal);
    
    if(FavoritesIds)
      isIdFavorites = FavoritesIds;

    if(OnFavorite){
      const favoriteIndex = favoritesArray.findIndex(item => item.id === Teacher.id);
      const favoriteidIndex = isIdFavorites.findIndex(item => item === Teacher.id);

      favoritesArray.splice(favoriteIndex, 1);
      isIdFavorites.splice(favoriteidIndex, 1);

      setFavoritesIds(isIdFavorites);
      setFavorites(favoritesArray);
      
      setOnFavorite(false);
    } else {
      setOnFavorite(true);
      
      favoritesArray.push(Teacher);
      isIdFavorites.push(Teacher.id);

      setFavoritesIds(isIdFavorites);
      setFavorites(favoritesArray);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  const LinkingWhatsapp = async () => {
    const Token = await AsyncStorage.getItem('token');

    api.post('/connections', { 
      proffy_id: Teacher.id
    }, {
      headers: {
        'authorization': `Bearer ${Token}`
      }
    })

    Linking.openURL(`whatsapp://send?phone=${Teacher.proffy.whatsapp}`);
  }

  useEffect(() => {
    const isWeek = () => {
      Teacher.data.map(item => {
        switch(item.week_day){
          case 'Segunda-Feira': 
            setSegundaLabel(`${item.from} - ${item.to}`);
            setSegunda(true);
            break;
          case 'Terça-Feira': 
            setTercaLabel(`${item.from} - ${item.to}`);
            setTerca(true);
            break;
          case 'Quarta-Feira': 
            setQuartaLabel(`${item.from} - ${item.to}`);
            setQuarta(true);
            break;
          case 'Quinta-Feira': 
            setQuintaLabel(`${item.from} - ${item.to}`);
            setQuinta(true);
            break;
          case 'Sexta-Feira': 
            setSextaLabel(`${item.from} - ${item.to}`);
            setSexta(true);
            break;
        }
      })
    }

    isWeek();
  }, [])

  return (
    <Container>
      <Header>
        <Profile>
          <UserImage source={{ uri: Teacher.proffy.user.photo }} />

          <ProfileInfo>
            <UserNome>{`${user.nome} ${user.sobrenome}`}</UserNome>

            <UserSubject>{Teacher.subject}</UserSubject>
          </ProfileInfo>
        </Profile>
      </Header>
      
      <Main>
        <ProffyInfo>
          <Bio>{Teacher.proffy.bio}</Bio>
        </ProffyInfo>

        <ContainerData>
          <Separator>
            <Label>Dia</Label>

            <Label>Horário</Label>
          </Separator>

          {
            Segunda? 
              <ActiveData>
                <LabelData>Segunda</LabelData>

                <Seta source={SetaImage} />

                <LabelData>{SegundaLabel}</LabelData>
              </ActiveData>
            :
              <DisabledData>
                <LabelData>Segunda</LabelData>

                <Seta source={SetaImage} />

                <LabelData>00h - 00h</LabelData>
              </DisabledData>
          }

          {
            Terca? 
              <ActiveData>
                <LabelData>Terça</LabelData>

                <Seta source={SetaImage} />

                <LabelData>{TercaLabel}</LabelData>
              </ActiveData>
            :
              <DisabledData>
                <LabelData>Terça</LabelData>

                <Seta source={SetaImage} />

                <LabelData>00h - 00h</LabelData>
              </DisabledData>
          }

          {
            Quarta? 
              <ActiveData>
                <LabelData>Quarta</LabelData>

                <Seta source={SetaImage} />

                <LabelData>{QuartaLabel}</LabelData>
              </ActiveData>
            :
              <DisabledData>
                <LabelData>Quarta</LabelData>

                <Seta source={SetaImage} />

                <LabelData>00h - 00h</LabelData>
              </DisabledData>
          }

          {
            Quinta? 
              <ActiveData>
                <LabelData>Quinta</LabelData>

                <Seta source={SetaImage} />

                <LabelData>{QuintaLabel}</LabelData>
              </ActiveData>
            :
              <DisabledData>
                <LabelData>Quinta</LabelData>

                <Seta source={SetaImage} />

                <LabelData>00h - 00h</LabelData>
              </DisabledData>
          }

          {
            Sexta? 
              <ActiveData>
                <LabelData>Sexta</LabelData>

                <Seta source={SetaImage} />

                <LabelData>{SextaLabel}</LabelData>
              </ActiveData>
            :
              <DisabledData>
                <LabelData>Sexta</LabelData>

                <Seta source={SetaImage} />

                <LabelData>00h - 00h</LabelData>
              </DisabledData>
          }
        </ContainerData>
      </Main>
      
      <Footer>
        <FooterInfo>
          <LabelFooter>Preço da minha hora:</LabelFooter>

          <Valor>R$ {Teacher.cost}</Valor>
        </FooterInfo>
        
        <Buttons>
          {
            OnFavorite? (
              <UnFavorited onPress={async () => await ChangeFavorite()}>
                <FavoritedIcon source={UnFavoriteIcon} />
              </UnFavorited>
            ) : (
              <Favorite onPress={async () => await ChangeFavorite()}> 
                <FavoritedIcon source={FavoriteIcon} />
              </Favorite>
            )
          }

          <Whats onPress={LinkingWhatsapp}>
            <WhatsIcon source={WhatsAppImage} />
            <LabelButton>Entrar em contato</LabelButton>
          </Whats>
        </Buttons>
      </Footer>
    </Container>
  );
}

export default TeacherItem;