import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Container = styled.View`
    width: ${wp('95%')};

    margin-left: ${wp('2%')};

    background-color: #fff;

    border: 1px solid #E6E6F0;
    border-radius: 10px;

    margin-bottom: 10px;
`;

export const Header = styled.View`
    padding: 20px;
`;

export const Profile = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
`;

export const UserImage = styled.Image`
    width: 55px;
    height: 55px;

    border-radius: 27.5px;
`;

export const ProfileInfo = styled.View`
    display: flex;

    padding-left: 15px;
`;

export const UserNome = styled.Text`
    color: #32264D;

    font-family: 'Archivo_500Medium';
    font-size: ${hp('3%')};
`;

export const UserSubject = styled.Text`
    font-family: 'Poppins_400Regular';
    font-size: ${hp('2.2%')};

    margin-top: 3.5px;

    color: #6A6180;
`;

export const Main = styled.View``;

export const ProffyInfo = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;

    padding: 5px 20px 10px;
    margin-bottom: 10px;

    border-bottom-width: 1px;
    border-bottom-color: #E6E6F0;
`;

export const Bio = styled.Text`
    font-family: 'Poppins_400Regular';
    font-size: ${hp('2.3%')};

    color: #6A6180;
`;

export const ContainerData = styled.View`
    padding: 0 20px 20px;
`;

export const Separator = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    padding: 5px 10px 10px;
`;

export const Label = styled.Text`
    color: #6A6180;

    font-family: 'Archivo_500Medium';
`;

export const ActiveData = styled.View`
    background-color: #F0F0F7;

    border: 1px solid #ccc;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    padding: 2.5px 10px;

    margin-bottom: 5px;
`;

export const LabelData = styled.Text`
    color: #32264D;

    font-family: 'Poppins_700Bold';
    font-size: ${hp('2.2%')}; 

    margin-top: 2px;
`;

export const Seta = styled.Image`
    transform: rotate(180deg);
`;

export const DisabledData = styled.View`
    background-color: #F0F0F7;

    border: 1px solid #ccc;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    padding: 2.5px 10px;

    margin-bottom: 5px;

    opacity: 0.4;
`;

export const Footer = styled.View`
    border-top-width: 1px;
    border-top-color: #E6E6F0;

    background-color: #FAFAFC;

    padding: 20px;

    border-radius: 10px;
`;

export const FooterInfo = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;

export const LabelFooter = styled.Text`
    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.7%')};

    color: #6A6180;
`;

export const Valor = styled.Text`
    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.5%')};

    color: #774DD6;
`;

export const Buttons = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;

    margin-top: 15px;
`;

export const UnFavorited = styled.TouchableOpacity`
    width: ${wp('16%')};
    height: ${hp('9%')};

    margin-right: ${wp('2.5%')};

    background-color: red;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
`;

export const Favorite = styled.TouchableOpacity`
    width: ${wp('16%')};
    height: ${hp('9%')};

    margin-right: ${wp('2.5%')};

    background-color: #774DD6;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
`;

export const Whats = styled.TouchableOpacity`
    width: ${wp('65%')};
    height: ${hp('9%')};

    display: flex;
    align-items: center;
    flex-direction: row;

    background-color: #04D361;

    border-radius: 10px;

    padding: 0 15px;
`;

export const WhatsIcon = styled.Image`
    width: 25px;
    height: 25px;
`;

export const LabelButton = styled.Text`
    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.5%')};
    font-weight: 600;

    color: #FFF;

    margin-left: 15px;
    margin-top: 3.5px;
`;

export const FavoritedIcon = styled.Image`
    width: 30px;
    height: 30px;
`;