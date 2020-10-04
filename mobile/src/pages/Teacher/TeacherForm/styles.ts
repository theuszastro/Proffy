import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const Container = styled(SafeAreaView)`
    width: ${wp('100%')};
    height: ${hp('100%')};

    background-color: #6842C2;
`;

export const Header = styled.View`
    background-color: #774DD6;

    height: ${hp('44%')};
`;

export const SubHeader = styled.View`
    background-color: #6842C2;

    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    padding: 5px 20px;
`;

export const Back = styled.Image``;

export const SubHeaderTitle = styled.Text`
    color: #9C98A6;

    font-family: 'Archivo_500Medium';
    font-size: ${hp('3%')};
`;

export const Logo = styled.Image`
    width: 50px;
    height: 50px;

    margin-top: 10px;
`;

export const HeaderInfo = styled.View`
    padding: 30px 20px;
`;

export const HeaderTitle = styled.Text`
    color: #FFF;
    
    font-family: 'Archivo_700Bold';
    font-size: ${hp('4.5%')};
`;

export const HeaderDescription = styled.Text`
    color: rgba(255, 255, 255, .72);
    
    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.3%')};

    margin-top: 10px;
`;

export const Main = styled.View`
    background-color: #F0F0F7;

    flex: 1;
`;

export const Scroll = styled.ScrollView`
    padding-left: ${wp('3%')};

    margin-top: -30px;
`;

export const ContainerForm = styled.View`
    width: ${wp('94%')};
    height: 500px;

    background-color: #FFF;
    
    border: 1px solid #E6E6F0;
    border-radius: 10px;

    margin-bottom: 10px;

    padding: 20px;
`;