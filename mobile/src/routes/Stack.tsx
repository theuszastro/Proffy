import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TabsRoutes from './Tab';
import ContextoProvider from '../context';

import Splash from '../pages/splash';
import OnStudy from '../pages/OnBoarding/study';
import OnProffy from '../pages/OnBoarding/proffy';
import Login from '../pages/Login';
import RegisterInicio from '../pages/Register/Inicio';
import RegisterFinal from '../pages/Register/Final';
import Reset from '../pages/Reset';
import Home from '../pages/Home';
import TeacherFrom from '../pages/Teacher/TeacherForm';

const Stack = createStackNavigator();

const StackRoute: React.FC = () => {
    return (
        <ContextoProvider>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Splash" 
                    component={Splash} 
                    options={{
                        headerShown: false
                    }}
                />
                
                <Stack.Screen 
                    name="OnboardingStudy" 
                    component={OnStudy} 
                    options={{
                        headerShown: false
                    }}
                />
                
                <Stack.Screen 
                    name="OnboardingProffy" 
                    component={OnProffy} 
                    options={{
                        headerShown: false
                    }}
                /> 
                
                <Stack.Screen 
                    name="Login" 
                    component={Login} 
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen 
                    name="RegisterInicio" 
                    component={RegisterInicio} 
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen 
                    name="RegisterFinal" 
                    component={RegisterFinal} 
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen 
                    name="Reset"
                    component={Reset} 
                    options={{
                        headerShown: false
                    }}
                /> 

                <Stack.Screen 
                    name="Home" 
                    component={Home} 
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen 
                    name="Study" 
                    component={TabsRoutes} 
                    options={{
                        headerShown: false
                    }}
                />

                <Stack.Screen 
                    name="Teacher"
                    component={TeacherFrom}
                    options={{
                        headerShown: false
                    }}
                />
            </Stack.Navigator>  
        </ContextoProvider>
    );
}



export default StackRoute;