import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

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
    flex: 1;

    background-color: #F0F0F7;

    position: relative;

    display: flex;
    align-items: center;
`;

export const Form = styled.View`
    margin-top: ${Platform.OS === 'ios'? hp('6%') : hp('3%')};

    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

export const Row = styled.View`
    width: ${wp('85%')};

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`;

export const Title = styled.Text`
    font-family: 'Archivo_500Medium';
    font-size: ${hp('4%')};
    font-weight: bold;
`;

export const CreateAccount = styled.TouchableOpacity``;

export const LabelRegister = styled.Text`
    color: #8257E5;

    margin-top: 7px;

    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.3%')};
`;

export const ContainerEmail = styled.View`
    margin-top: 20px;

    position: relative;

    border: 1px solid #E6E6F0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    background-color: #fff;

    width: ${wp('85%')};
    height: ${hp('9%')};
`;

export const Email = styled.TextInput`
    width: ${wp('85%')};
    height: ${hp('9%')};

    padding-left: 20px;
    padding-top: 20px;

    font-family: 'Poppins_500Medium';
`;

export const ContainerPassword = styled.View`
    width: ${wp('85%')};
    height: ${hp('9%')};

    position: relative;

    display: flex;
    align-items: center;
    flex-direction: row;

    border: 1px solid #E6E6F0;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    borderTopWidth: 0;

    background-color: #fff;

    margin-bottom: 20px;
`;

export const Password = styled.TextInput`
    width: ${wp('70%')};
    height: ${hp('9%')};

    padding-left: 20px;
    margin-right: 12.5px;

    padding-top: 15px;
`;

export const Box = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
`;

export const CheckBox = styled.TouchableOpacity`
    width: 22.5px;
    height: 22.5px;

    background-color: #FFF;

    border: 1px solid #E6E6F0;
    border-radius: 5px;
`;

export const ActiveCheckBox = styled.TouchableOpacity`
    width: 22.5px;
    height: 22.5px;

    background-color: #04D361;

    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ResetPassword = styled.TouchableOpacity``;

export const DisableSubmit = styled.TouchableOpacity`
    margin-top: 20px;

    background-color: #DCDCE6;

    width: ${wp('85%')};
    height: 64px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
`;

export const ActiveSubmit = styled.TouchableOpacity`
    margin-top: 20px;

    background-color: #04BF58;

    width: ${wp('85%')};
    height: 64px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
`;

export const Label = styled.Text`
    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.1%')};

    color: #6A6180;
`;

export const Lembrar = styled.Text`
    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.1%')};
    
    color: #6A6180;

    margin-left: 10px;
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