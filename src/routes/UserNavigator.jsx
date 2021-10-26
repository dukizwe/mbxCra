import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from '../screens/HomeScreen'
import NewClaScreen from '../screens/NewClaScreen'

const Stack = createNativeStackNavigator()

export default function UserNavigator() {
          return (
                    <Stack.Navigator>
                              <Stack.Screen name="Home" component={HomeScreen} />
                              <Stack.Screen name="NewCla" component={NewClaScreen} options={{ title: 'Ajouter CLA' }}/>
                    </Stack.Navigator>
          )
}