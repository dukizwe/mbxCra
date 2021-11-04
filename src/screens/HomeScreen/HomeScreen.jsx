import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs'
import AffectationTab from './AffectationTab';
import CraTab from './CraTab';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

export default function HomeScreen({ navigation }) {

          const TopTab = createMaterialTopTabNavigator()
          const BottomTab = createBottomTabNavigator()
          return (
                    <View style={styles.container}>
                              {/* <TopTab.Navigator screenOptions={{ tabBarPressColor: '#f1f1f1', tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold',  fontSize: 16}}}>
                                        <TopTab.Screen name="AffectationTab" options={{ title: 'Mes affectations'}} component={AffectationTab} />
                                        <TopTab.Screen name="CraTab" options={{ title: 'Mes CRA'}} component={CraTab} />
                              </TopTab.Navigator> */}
                              <BottomTab.Navigator>
                                        <BottomTab.Screen name="AffectationTab" options={{ title: 'Mes affectations', tabBarIcon: () => <FontAwesome5 name="tasks" size={24} color="black" />}} component={AffectationTab} />
                                        <BottomTab.Screen name="CraTab" options={{ title: 'Mes CRA', tabBarIcon: () => <Entypo name="list" size={24} color="black" />}}  component={CraTab} />
                                        <BottomTab.Screen name="Activites" options={{ title: 'Activites', tabBarIcon: () => <Feather name="activity" size={24} color="black" />}}  component={CraTab} />
                              </BottomTab.Navigator>
                    </View>
          );
}
const styles = StyleSheet.create({
          container: {
                    backgroundColor: 'red',
                    flex: 1
          }
})