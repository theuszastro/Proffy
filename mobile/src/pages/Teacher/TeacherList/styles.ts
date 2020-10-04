import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Animated } from 'react-native';

export const Container = styled(SafeAreaView)`
    width: ${wp('100%')};
    height: ${hp('100%')};

    background-color: #6842C2;
`;

export const Header = styled.View`
    background-color: #774DD6;

    min-height: ${hp('42.5%')};
    max-height: ${hp('75%')};
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

export const Filtro = styled.TouchableOpacity`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    width: ${wp('92%')};
    height: ${hp('7%')};

    margin-left: ${wp('4%')};

    padding-top: 5px;
    padding-bottom: 15px;

    border-bottom-width: 1;
    border-bottom-color: #9871F5;
`;

export const FiltroIcon = styled(AntDesign).attrs({
    name: 'filter',
    size: 35,
    color: '#04Bf58'
})`
    margin-top: 10px;
`;

export const FiltroLabel = styled.Text`
    color: rgba(255, 255, 255, .72);

    font-family: 'Archivo_500Medium';
    font-size: ${hp('2.7%')};

    margin: 6px 10px 0 -35px;
`;

export const FiltroToggle = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 10px;
`;

export const Open = styled.Image`
    width: 17px;
    height: 17px;
`;

export const Close = styled.Image`
    width: 17px;
    height: 17px;
`;

export const ContainerOption = styled.View`
    margin: 15px 0 100px;

    margin-left: ${wp('4%')};
`;

export const Select = styled.View``;

export const LabelOption = styled.Text`
    font-family: 'Poppins_500Medium';
    font-size: ${hp('2.2%')};

    color: rgba(255, 255, 255, .7);
`;

export const Divisao = styled.View`
    display: flex;
    align-items: center;
    flex-direction: row;

    width: ${wp('92%')};

    padding: 5px 0px 0;
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

export const Aviso = styled.Text`
    color: #C1BCCC;

    font-family: 'Poppins_600SemiBold';
    font-size: ${hp('3.3%')};

    text-align: center;

    margin-top: 85px;
`;