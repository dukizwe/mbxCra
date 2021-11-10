import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { AntDesign } from '@expo/vector-icons';
import Header from '../components/Header/Header'
import HomeNavigator from '../routes/HomeNavigator';
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingScreen from '../screens/Settings/SettingScreen';
import { DrawerContentScrollView, DrawerItem,  } from '@react-navigation/drawer'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { primaryColor } from '../components/Welcome/styles';
import { useSelector } from 'react-redux';
import { userSelector } from '../store/selectors/userSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../store/actions/userActions';
import { Switch } from 'native-base';

const DrawerContent = (props ) => {
          const user = useSelector(userSelector)
          const dispatch = useDispatch()
          const logout = async () => {
                    await AsyncStorage.removeItem('user')
                    await AsyncStorage.removeItem('affectations')
                    await AsyncStorage.removeItem('cras')
                    dispatch(setUserAction(null))
          }
          return (<View style={{flex: 1}}>
                    <DrawerContentScrollView>
                              <View styles={styles.drawerSection}>
                                        <DrawerItem
                                                  style={styles.userSection}
                                                  label={() => {
                                                            return <View style={styles.emailNames}>
                                                                      <Text style={styles.names}>{user ? user.fname+ ' '+user.lname : 'Dukizwe Darcy'}</Text>
                                                                      <Text style={styles.email}>{user ? user.username : 'darcy@mediabox.bi'}</Text>
                                                            </View>
                                                  }}
                                                  icon={({ focused, size, color}) => {
                                                            return <View style={styles.userImage}>
                                                                      <AntDesign name="user" size={30} color="#777" />
                                                            </View>
                                                   }}
                                        />
                                        <DrawerItem  label="Accueil" icon={({ focused, size, color}) => {
                                                  return <AntDesign name="home" size={size} color={primaryColor} />
                                        }} />
                                        <DrawerItem  label="Parametres" icon={({ focused, size, color}) => {
                                                  return <AntDesign name="setting" size={size} color={primaryColor} />
                                        }} />
                                        <DrawerItem label="Affectations" icon={({ focused, size, color}) => {
                                                  return <FontAwesome5 name="tasks" size={24} color={primaryColor} />
                                        }} />
                              </View>
                    </DrawerContentScrollView>
                    <View style={styles.bottomSection}>
                              <View style={styles.preference}>
                                        <TouchableOpacity>
                                                  <Text style={styles.nightText}>Mode nuit</Text>
                                        </TouchableOpacity>
                                        <Switch isChecked={false} colorScheme="primary" />
                              </View>
                              <DrawerItem onPress={() => logout()} label="Déconnexion" icon={({ focused, size, color}) => {
                                        return <MaterialCommunityIcons name='exit-to-app' color={primaryColor} size={size} />
                              }} />
                    </View>
          </View>)
}

const Drawer = createDrawerNavigator()

export default function RootNavigator() {
          return (
                    <Drawer.Navigator screenOptions={{drawerPosition: 'right', headerShown: false /* header: () => <Header /> */}} drawerContent={props => <DrawerContent {...props} /> }>
                              <Drawer.Screen name="Home" component={HomeNavigator} />
                              <Drawer.Screen name="Settings" component={SettingScreen} />
                    </Drawer.Navigator>
          )
}

const styles = StyleSheet.create({
          bottomSection: {
                    marginBottom: 15,
                    borderTopColor: '#f4f4f4',
                    borderTopWidth: 1
          },
          userSection: {
                    paddingRight: 0
          },
          emailNames: {
                    marginLeft: -20,
                    width: 200
          },
          names: {
                    fontWeight: 'bold',
                    fontSize: 16,
          },
          email: {
                    color: '#777',
                    marginTop: 5,
                    fontSize: 12
          },
          userImage: {
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    borderWidth: 1,
                    borderColor: '#ddd',
                    alignItems: 'center',
                    justifyContent: 'center',
          },
          preference: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 20
          },
          nightText: {
                    fontSize: 16,
                    fontWeight: 'bold'
          }
})