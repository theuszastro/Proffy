import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

export const Container = styled(SafeAreaView)`
    width: 100%;
    height: 100%;

    background-color: #774DD6;
`;

export const Background = styled.Image`
    width: ${wp('120%')};
    height: ${hp('100%')};
`;

export const Center = styled.View`
    position: absolute;
    top: 0;
    left: 0;

    width: ${wp('100%')};
    height: ${hp('100%')};

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const ProffyLogo = styled.Image`
    width: ${wp('55%')};
    height: 100px;
`;

export const ProffySlogan = styled.Text`
    font-family: 'Poppins_500Medium';
    font-size: ${hp('3%')};

    color: rgba(255, 255, 255, .6);

    margin-left: ${wp('-3.5%')};
    margin-top: ${Platform.OS === 'ios'? hp('-1%') : hp('-2.5%') };
`;

export const Rotate = styled.View`
    width: 100%;

    transform: rotate(90deg);
`;