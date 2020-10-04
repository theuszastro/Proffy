import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
    width: ${wp('100%')};
    height: ${hp('100%')};

    background-color: #F0F0F7;
`;

export const Header = styled.View`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    width: ${wp('100%')};

    padding: 15px 30px;
`;

export const Back = styled.Image``;

export const Sections = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;

    width: 30px;
`;

export const SectionActive = styled.View`
    width: 10px;
    height: 10px;

    background-color: #774DD6;

    border-radius: 3px;

    margin-right: 5px;
`;

export const SectionDesactive = styled.View`
    width: 10px;
    height: 10px;

    background-color: #9C98A6;

    border-radius: 3px;
`;

export const Main = styled.View`
    width: ${wp('90%')};
`;

export const Title = styled.Text`
    margin-top: ${hp('4.5%')};

    color: #32264D;

    font-family: 'Poppins_500Medium';
    font-size: ${hp('5%')};

    margin-left: ${wp('10%')};
    margin-bottom: ${wp('1%')};
`;

export const Description = styled.Text`
    margin-left: ${wp('10%')};

    color: #6A6180;

    font-family: 'Poppins_400Regular'; 
    font-size: ${hp('2.2%')};
`;

export const Form = styled.View`
    margin-left: ${wp('10%')};
    margin-top: ${hp('8%')};
`;

export const Subtitle = styled.Text`
    color: #32264D;

    font-family: 'Poppins_500Medium';
    font-size: ${hp('3.8%')}; 

    margin-bottom: ${hp('1%')};
`;

export const ContainerNome = styled.View`
    position: relative;

    width: ${wp('80%')};
    height: 60px;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const Nome = styled.TextInput`
    width: ${wp('80%')};
    height: 60px;

    background-color: #fff;

    padding: 20px 20px 0;

    font-family: 'Poppins_500Medium';

    border: 1px solid #E6E6F0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const ContainerSobrenome = styled.View`
    position: relative;

    width: ${wp('80%')};
    height: 60px;
`;

export const Sobrenome = styled.TextInput`
    width: ${wp('80%')};
    height: 60px;

    padding: 20px 20px 0;

    border: 1px solid #E6E6F0;
    borderTopWidth: 0;

    font-family: 'Poppins_500Medium';

    background-color: #fff;
`;

export const ContainerFoto = styled.View`
    position: relative;

    width: ${wp('80%')};
    height: 60px;

    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

export const Foto = styled.TextInput`
    width: ${wp('80%')};
    height: 60px;

    border: 1px solid #E6E6F0;
    borderTopWidth: 0;

    padding: 20px 20px 0;

    font-family: 'Poppins_500Medium';

    background-color: #fff;

    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
`;

export const ButtonActive = styled.TouchableOpacity`
    margin-top: 20px;

    background-color: #8257E5;

    width: ${wp('80%')};
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
`;

export const ButtonDesactive = styled.TouchableOpacity`
    margin-top: 20px;

    background-color: #DCDCE6;

    width: ${wp('80%')};
    height: 60px;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 10px;
`;

export const LabelActive = styled.Text`
    color: #FFF;

    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.5%')};
    font-weight: bold;
`;

export const LabelDesactive = styled.Text`
    color: #9C98A6;

    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.5%')};
    font-weight: bold;
`;
