import React, { useState } from 'react';

import { useIsFocused } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tabs = createBottomTabNavigator();

import Ionicons from 'react-native-vector-icons/Ionicons';

import Teachers from '../pages/Teacher/TeacherList';
import Favorites from '../pages/Teacher/TeacherFavorited';

const TabsRoutes: React.FC = () => {
    return (
        <Tabs.Navigator
            tabBarOptions={{
                style: {
                    elevation: 0,
                    shadowOpacity: 0,
                    height: 54
                },
                tabStyle: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                iconStyle: {
                    flex: 0,
                    width: 20,
                    height: 20
                },
                labelStyle: {
                    fontFamily: 'Archivo_700Bold',
                    fontSize: 13,
                    marginLeft: 16
                },
                inactiveBackgroundColor: '#fafafc',
                activeBackgroundColor: '#ebebf5',
                inactiveTintColor: '#c1bccc',
                activeTintColor: '#32264d'
            }}
        >
                <Tabs.Screen 
                    name="Teachers" 
                    component={Teachers}
                    options={{
                        tabBarLabel: 'Proffys',

                        tabBarIcon: ({ color, size, focused }) => {
                            return <Ionicons name="ios-easel" size={size} color={focused? '#8257e5' : color} />
                        }
                    }}
                />

                <Tabs.Screen 
                    name="TeacherFavortited" 
                    component={Favorites} 
                    options={{
                        tabBarLabel: 'Favoritos',
                        tabBarIcon: ({ color, size, focused }) => {
                            return <Ionicons name="ios-heart" size={size} color={focused? '#8257e5' : color} />
                        }
                    }}
                />
        </Tabs.Navigator>
    );
}

export default TabsRoutes;