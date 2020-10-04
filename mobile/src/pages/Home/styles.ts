import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(SafeAreaView)`
    width: ${wp('100%')};
    height: ${hp('100%')};
    
    background-color: #774DD6;
`;

export const Header = styled.View`
    width: ${wp('100%')};
    height: ${hp('45%')};
`;

export const Profile = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    padding: 20px 25px;
`;

export const UserDetails = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
`;

export const UserImage = styled.Image`
    width: ${wp('12%')};
    height: ${hp('7%')}; 

    border-radius: ${hp('6%')};

    margin-right: 15px;

    background-color: #8642C2;
`;

export const UserNome = styled.Text`
    color: #FFF;

    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.5%')};
`;

export const Logout = styled(RectButton)`
    background-color: rgba(0, 0, 0, .5);

    padding: 10px;

    border-radius: 10px;
`;

export const Rotate = styled.View`
    transform: rotate(-90deg);
`;

export const ProffyIlustration = styled.Image`
    width: ${wp('90%')};
    height: ${hp('28%')};

    margin-left: ${wp('5%')};
`;

export const Main = styled.View`
    background-color: #fff;

    display: flex;
    flex: 1;
`;

export const Title = styled.Text`
    font-family: 'Archivo_400Regular';
    font-size: ${hp('3.5%')};

    color: #6A6180;

    margin-top: 15px;
    padding-left: 22.5px;
`;

export const Description = styled.Text`
    font-family: 'Archivo_700Bold';
    font-size: ${hp('3.7%')};

    color: #6A6180;

    margin-top: -2px;
    padding-left: 22.5px;
`;

export const Actions = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    margin-top: 20px;
`;

export const Estudar = styled(RectButton)`
    background-color: #8257E5;

    width: ${wp('42.5%')};
    height: ${hp('24%')};

    border-radius: 10px;

    padding: 20px 20px 15px;

    margin-right: 15px;

    display: flex;
    justify-content: space-between;
`;

export const EstudarIcon = styled.Image`
    width: ${wp('12%')};
    height: ${hp('5%')};
`;

export const DarAulas = styled(RectButton)`
    background-color: #04BF58;

    width: ${wp('42.5%')};
    height: ${hp('24%')};

    border-radius: 10px;

    padding: 20px 20px 15px;

    display: flex;
    justify-content: space-between;
`;

export const DarAulasIcon = styled.Image`
    width: ${wp('12%')};
    height: ${hp('5%')};
`;

export const Label = styled.Text`
    font-family: 'Poppins_700Bold';
    font-size: ${hp('3%')};

    color: #FFF;
`;

export const Info = styled.View`
    position: absolute;
    left: 25px;
    bottom: ${hp('2%')};
`;

export const Total = styled.Text`
    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.5%')};

    color: #6A6180;
`;

export const Corazom = styled.Image`
    width: 18px;
    height: 18px;
`;