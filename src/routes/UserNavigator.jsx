import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import NewClaScreen from '../screens/NewClaScreen'
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/Header/Header'
import NonPlanifieScreen from '../screens/NonPlanifieScreen'
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ViewCraScreen, { ViewCraHeader } from '../screens/ViewCraScreen';
import AffectationViewScreen from '../screens/AffectationViewScreen/AffectationViewScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingScreen from '../screens/Settings/SettingScreen';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();

export default function UserNavigator() {
          return (
                    <Drawer.Navigator screenOptions={{drawerPosition: 'right'}}>
                              <Drawer.Screen name="Home" component={HomeScreen} />
                              <Drawer.Screen name="Settings" component={SettingScreen} />
                    </Drawer.Navigator>
                    /*<Stack.Navigator>
                              <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => <Header />}} />
                              <Stack.Screen name="AffectationView" component={AffectationViewScreen} options={{ title: ''}}/>
                              <Stack.Screen name="NonPlanifie" component={NonPlanifieScreen} options={{ title: 'Activé non planifié' }}/>
                              <Stack.Screen name="NewCla" component={NewClaScreen} options={{ title: 'Ajouter un CRA' }}/>
                              <Stack.Screen name="ViewCra" component={ViewCraScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>*/
          )
}