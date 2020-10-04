import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

export const Container = styled(SafeAreaView)`
    width: ${wp('100%')};
    height: ${hp('100%')};

    background-color: #6842C2;
`;

export const Header = styled.View`
    background-color: #774DD6;

    height: ${hp('38%')};
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    padding: 30px 20px;
`;

export const HeaderTitle = styled.Text`
    color: #FFF;
    
    font-family: 'Archivo_700Bold';
    font-size: ${hp('4.5%')};
`;

export const Row = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;
`;

export const Carinha = styled.Image`
    width: 25px;
    height: 25px;

    margin-right: 10px;
`;

export const Label = styled.Text`
    color: rgba(255, 255, 255, .72);

    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.5%')};
`;

export const Main = styled.View`
    display: flex;
    flex: 1;

    background-color: #F0F0F7;
`;

export const Scroll = styled.ScrollView`
    margin-top: -40px;

    margin-bottom: 50px;
`;