import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(SafeAreaView)`
    position: absolute;
    top: 0;
    left: 0;

    z-index: 10;

    width: ${wp('100%')};
    height: ${hp('100%')};

    background-color: #774DD6;

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Main = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    position: relative;
`;

export const Check = styled.Image`
    width: ${wp('25%')};
    height: ${hp('15%')};

    margin-top: ${hp('-16%')};
    margin-bottom: ${hp('2%')};
`;

export const Title = styled.Text`
    font-family: 'Poppins_700Bold';
    font-size: ${hp('6.5%')};

    color: rgba(255, 255, 255, .9);

    text-align: center;
    margin-bottom: ${hp('1.5%')};
`;

export const Description = styled.Text`
    margin-top: ${hp('-10%')};

    color: rgba(255, 255, 255, .7);

    font-size: ${hp('3%')};
    text-align: center;
`;

export const Button = styled(RectButton)`
    width: ${wp('75%')};
    height: ${hp('9%')};

    border-radius: 15px; 

    background-color: #04BF58;

    /* margin-top: 50px; */

    position: absolute;
    bottom: ${hp('8%')};

    display: flex;
    align-items: center;
    justify-content: center;
`;

export const ButtonLabel = styled.Text`
    font-family: 'Poppins_500Medium';
    font-size: ${hp('3%')};

    color: #fff;
`;
