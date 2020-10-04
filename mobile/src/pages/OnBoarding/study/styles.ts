import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
    background-color: #774DD6;
`;

export const Header = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;

    height: ${hp('40%')};

    background-color: #774DD6;
`;

export const Background = styled.Image`
    width: ${wp('100%')};
    height: ${hp('100%')};
`;

export const StudyIcon = styled.Image`
    position: absolute;
`;

export const Main = styled.View`
    background-color: #F0F0F7;
`;

export const Numero = styled.Text`
    margin: 40px 30px 0px;

    color: #9C98A6;

    font-size: ${hp('6%')};
    font-family: 'Archivo_500Medium';
`;

export const Label = styled.Text`
    margin: -25px 30px 0;

    color: #32264D;

    font-family: 'Poppins_500Medium';
    font-size: ${hp('5%')};

    margin-bottom: ${hp('8%')};
`;

export const Footer = styled.View`
    width: 100%;

    padding: 12.5px 30px 0;

    background-color: #F0F0F7;

    position: absolute;
    bottom: -30px; 

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
    flex: 1;
`;

export const Sections = styled.View`
    width: 40px;

    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const SectionActive = styled.View`
    width: 8px;
    height: 8px;

    background-color: #774DD6;

    border-radius: 3px;
`;

export const SectionDesactive = styled.View`
    width: 8px;
    height: 8px;

    background-color: #9C98A6;

    border-radius: 3px;

    margin-left: 3px;
`;

export const Next = styled.TouchableOpacity`
    width: 60px;
    height: 50px;

    padding-top: 7px;
    padding-left: 4px;
`;

export const Proxima = styled.Image`
    transform: rotate(180deg);
`;
