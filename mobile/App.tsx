import React from 'react';
import { AppLoading } from 'expo';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes/Stack';

import { useFonts, Archivo_400Regular, Archivo_500Medium, Archivo_700Bold } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

const App: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_600SemiBold, Poppins_700Bold,
    Archivo_400Regular, Archivo_500Medium, Archivo_700Bold
  }) 
  
  if(!fontsLoaded){
    return <AppLoading />
  } else {
    return (
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    );
  }
}

export default App;