import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createMaterialTopTabNavigator  } from '@react-navigation/material-top-tabs'
import AffectationTab from './AffectationTab';
import CraTab from './CraTab';

export default function HomeScreen({ navigation }) {

          const TopTab = createMaterialTopTabNavigator()
          return (
                    <View style={styles.container}>
                              <TopTab.Navigator screenOptions={{ tabBarPressColor: '#f1f1f1', tabBarLabelStyle: { textTransform: 'none', fontWeight: 'bold',  fontSize: 16}}}>
                                        <TopTab.Screen name="AffectationTab" options={{ title: 'Mes affectations'}} component={AffectationTab} />
                                        <TopTab.Screen name="CraTab" options={{ title: 'Mes CRA'}} component={CraTab} />
                              </TopTab.Navigator>
                    </View>
          );
}
const styles = StyleSheet.create({
          container: {
                    backgroundColor: 'red',
                    flex: 1
          }
})