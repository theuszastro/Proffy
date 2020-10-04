import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
    width: ${wp('100%')};
    height: ${hp('100%')};

    background-color: #774DD6;  
`;

export const Header = styled.View`
    width: ${wp('100%')};
    height: ${hp('42.5%')}; 

    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Background = styled.Image`
    width: ${wp('100%')};
    height: ${hp('100%')};

    position: absolute;
`;

export const ProffyLogo = styled.Image`
    width: ${wp('45%')};
    height: ${hp('10%')};
`;

export const ProffyDescription = styled.Text`
    color: rgba(255, 255, 255, .7);

    font-size: ${hp('2.5%')};

    margin-top: ${hp('-1%')};
    margin-left: ${wp('-7%')};
`;

export const Main = styled.View`
    display: flex;
    align-items: center;

    flex: 1;

    background-color: #F0F0F7;
`;

export const Form = styled.View``;

export const Back = styled.Image`
    margin-top: ${hp('2%')};
`;

export const Title = styled.Text`
    font-family: 'Archivo_500Medium';
    font-size: ${hp('4%')};
    font-weight: bold;

    color: #32263D;

    margin-top: ${hp('1%')};
`;

export const Description = styled.Text`
    font-family: 'Poppins_400Regular';
    font-size: ${hp('2.7%')};

    color: #32263D;

    margin-top: ${hp('1.3%')};
    margin-bottom: ${hp('1.5%')};
`;

export const ContainerEmail = styled.View`
    margin-top: 20px;

    position: relative;

    border: 1px solid #E6E6F0;
    border-radius: 10px;

    background-color: #fff;

    width: ${wp('85%')};
    height: ${hp('10%')};
`;

export const Email = styled.TextInput`
    width: ${wp('85%')};
    height: ${hp('10%')};

    padding: 20px 20px 0;

    font-family: 'Poppins_500Medium';
`;

export const DisableButton = styled.TouchableOpacity`
    margin-top: 20px;

    background-color: #DCDCE6;

    width: ${wp('85%')};
    height: 64px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
`;

export const ActiveButton = styled.TouchableOpacity`
    margin-top: 20px;

    background-color: #04BF58;

    width: ${wp('85%')};
    height: 64px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
`;

export const LabelDesactive = styled.Text`
    color: #9C98A6;

    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.5%')};
    font-weight: bold;
`;

export const LabelActive = styled.Text`
    color: #FFF;

    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.5%')};
    font-weight: bold;
`;