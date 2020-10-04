import React, { useEffect, useState } from 'react';
import { TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { useNavigation } from '@react-navigation/native';
import { useFavorites } from '../../../context';

import ModalSelector from 'react-native-modal-selector';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import BackImage from '../../../assets/images/icons/back.png';
import LogoImage from '../../../assets/images/logo.png';
import Emoji from '../../../assets/images/icons/smile.png';

import ChevronUp from '../../../assets/images/icons/Up.png';
import ChevronDown from '../../../assets/images/icons/Down.png';

import TeacherItem from '../../components/TeacherItem';

import { WeekDayOptions, HoursOptions, MateriaOptions } from './Arrays';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../../../services/api';

import { Container, Header, SubHeader, Back, SubHeaderTitle, Logo, HeaderInfo, HeaderTitle, Row, Carinha, Label, Filtro, FiltroIcon, FiltroLabel, FiltroToggle, Open, Close, ContainerOption, Select, LabelOption, Divisao, Main, Aviso, Scroll } from './styles';

export interface TeacherProps {
  id: number;
  cost: number | string;
  subject: string;
  data: [{
    week_day: string;
    from: string;
    to: string;
    class_id: number;
  }],
  proffy: {
    id: number;
    whatsapp: string;
    bio: string;
    user: {
      id: number;
      nome: string; 
      sobrenome: string;
      email: string;
      photo: string;
    }
  }
}

const TeacherList: React.FC = () => {
  const navi = useNavigation();
  const { Favorites, setFavorites, FavoritesIds, setFavoritesIds } = useFavorites();
  
  const [CacheProffyLength, setCacheProffyLength] = useState(0);
  const [ProffyLength, setProffyLength] = useState(0);
  
  const [Teachers, setTeachers] = useState([]);

  const [OpenFilter, setOpenFilter] = useState(false);
  const [NoResults, setNoResults] = useState(false);
  
  const [Materia, setMateria] = useState('');
  const [Week, setWeek] = useState('');
  const [Hours, setHours] = useState('');

  async function getFavorites(){
    await AsyncStorage.getItem('favorites').then(response => {
      if(response){
        const FavoritesTeacher: TeacherProps[] = JSON.parse(response);
        
        const FavoritesId = FavoritesTeacher.map(item => {
          return item.id;
        });
        
        setFavoritesIds(FavoritesId);

        setFavorites(FavoritesTeacher);
      }
    })
  }

  async function getProffyLength(){
    try {
      const ProffysLength = await api.get('/classe');

      setCacheProffyLength(ProffysLength.data.total);
      
      setProffyLength(ProffysLength.data.total);
    } catch (err) {
      console.log(err);
    }
  } 

  useEffect(() => {
    async function getProffys(){
      try {
        const Proffys = await api.get('/classes');

        setTeachers(Proffys.data.classes);
      } catch (err) {
        console.log(err);
      }
    }

    async function Execute(){
      await getProffyLength();
      
      await getFavorites();
      
      await getProffys();
    }

    Execute();
  }, []);

  useEffect(() => {
    const getTeachersFiltro = async () => {
      try {
        const response = await api.get('/filtro', {
          params: {
            subject: Materia,
            week_day: Week,
            time: Hours
          }
        });
        
        NoResults && setNoResults(false);
        
        setTeachers(response.data.classes);
      } catch (err) {
        setNoResults(true);
      }
    }

    async function Execute () {
      await getTeachersFiltro();
    }

    if(Materia.length > 0 && Week.length > 0 && Hours.length > 0)
      Execute();

  }, [Materia, Week, Hours])

  useEffect(() => {
    const Menos = Favorites? Favorites.length : 0;

    setProffyLength(CacheProffyLength - Menos);    
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
            Proffys {'\n'}
            Disponiveis.
          </HeaderTitle>

          <Row>
            <Carinha source={Emoji} resizeMode="contain" />

            <Label>{ProffyLength} {ProffyLength <= 1? 'proffy': 'proffys'}</Label>
          </Row>
        </HeaderInfo>

        <Filtro  style={{ marginBottom: OpenFilter? 0 : 60 }} onPress={() => setOpenFilter(!OpenFilter)}>
          <FiltroIcon />

          <FiltroLabel>Filtar por dia, hora matéria.</FiltroLabel>

          <FiltroToggle>
            {
              OpenFilter? 
                <Close source={ChevronUp} /> 
              :   
                <Open source={ChevronDown} />
            }
          </FiltroToggle>
        </Filtro>

        {
          OpenFilter? (
            <ContainerOption>
              <Select>
                <LabelOption>Matéria</LabelOption>

                <ModalSelector 
                  data={MateriaOptions} 
                  onChange={option => setMateria(option.value)}
                  initValue="Qual a matéria?"
                  style={{ width: wp('92%') }}
                  initValueTextStyle={{ color: '#C1BCCC', fontSize: hp('2.4%'), fontFamily: 'Poppins_700Bold', marginTop: 2.5 }}
                  selectTextStyle={{ color: '#C1BCCC', fontSize: hp('2.4%'), fontFamily: 'Poppins_700Bold', marginTop: 2.5 }}
                  selectStyle={{
                    borderWidth: 1,
                    borderColor: '#E6E6F0',
                    borderRadius: 8,
                    backgroundColor: '#FAFAFC',
                    height: 50,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                />
              </Select>
              
              <Divisao>
                <Select>
                  <LabelOption>Dia da semana</LabelOption>

                  <ModalSelector 
                    data={WeekDayOptions} 
                    onChange={option => setWeek(option.value)}
                    initValue="Qual dia da semana?"
                    style={{ width: wp('55%') }}
                    initValueTextStyle={{ color: '#C1BCCC', fontSize: hp('2.4%'), fontFamily: 'Poppins_700Bold', marginTop: 2.5 }}
                    selectTextStyle={{ color: '#C1BCCC', fontSize: hp('2.4%'), fontFamily: 'Poppins_700Bold', marginTop: 2.5 }}
                    selectStyle={{
                      borderWidth: 1,
                      borderColor: '#E6E6F0',
                      borderRadius: 8,
                      backgroundColor: '#FAFAFC',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  />
                </Select>

                <Select>
                  <LabelOption style={{ marginLeft: wp('2%') }}>Horário</LabelOption>

                  <ModalSelector
                    data={HoursOptions}
                    onChange={option => setHours(option.value)}
                    initValue="Qual horário?"
                    style={{ width: wp('35%'), marginLeft: wp('2%') }}
                    initValueTextStyle={{ color: '#C1BCCC', fontSize: hp('2.4%'), fontFamily: 'Poppins_700Bold', marginTop: 2.5 }}
                    selectTextStyle={{ color: '#C1BCCC', fontSize: hp('2.4%'), fontFamily: 'Poppins_700Bold', marginTop: 2.5 }}
                    selectStyle={{
                      borderWidth: 1,
                      borderColor: '#E6E6F0',
                      borderRadius: 8,
                      backgroundColor: '#FAFAFC',
                      height: 50,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  />
                </Select>
              </Divisao>
            </ContainerOption>
          ) : null
        }
      </Header>

      <Main>
        {
          NoResults? 
            (
              <Aviso>Sem Resultados!</Aviso>
            )
          :
            (
              <Scroll>
                {
                  Teachers.map((item: TeacherProps) => {
                    if(FavoritesIds && FavoritesIds.includes(item.id))
                      return;

                    return (
                      <TeacherItem
                        key={item.id}
                        Teacher={item}
                        isFavorite={FavoritesIds? FavoritesIds.includes(item.id) : false}
                      /> 
                    )
                  })
                }
              </Scroll>
            )
        }
      </Main>
    </Container>
  );
}

export default TeacherList;