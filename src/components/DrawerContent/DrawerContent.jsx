import React, { useState} from 'react'
import { Text, View, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem,  } from '@react-navigation/drawer'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { userSelector } from '../../store/selectors/userSelector';
import { primaryColor } from '../Welcome/styles';
import { setUserAction } from '../../store/actions/userActions';
import styles from './styles';
import { uncompletedAffectationSelector } from '../../store/selectors/affectationsSelector';
import { useNavigation } from '@react-navigation/core';

const UncompletedAffectations = () => {
          const affectations = useSelector(uncompletedAffectationSelector)
          const navigation = useNavigation()
          const onAffectationPress = (affectation) => {
                    navigation.navigate('AffectationView', { affectation })
          }
          return (
                    <View style={styles.uncompletedAffectations}>
                              {affectations.map(affectation => <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        onPress={() => onAffectationPress(affectation)}
                                        background={TouchableNativeFeedback.Ripple('#c9c5c5', false)}
                                        style={{borderRadius: 10}}
                                        key={affectation.IDAffectation}
                              >
                                        <View style={styles.affectation}>
                                                  <Feather name="circle" size={24} color="#777" />
                                                  <Text numberOfLines={1} style={styles.affectationText}>{affectation.DescActivite}</Text>
                                        </View>
                              </TouchableNativeFeedback>)}
                    </View>
          )
}

export default function DrawerContent (props ) {
          const user = useSelector(userSelector)
          const dispatch = useDispatch()
          const navigation = useNavigation()
          const [showAffectations, setShowAffectatons] = useState(true)
          const logout = async () => {
                    await AsyncStorage.removeItem('user')
                    await AsyncStorage.removeItem('affectations')
                    await AsyncStorage.removeItem('cras')
                    dispatch(setUserAction(null))
          }

          const toggleAffectation = () => {
                    setShowAffectatons(show => !show)
          }
          return (<View style={{flex: 1}}>
                    <DrawerContentScrollView>
                              <View styles={styles.drawerSection}>
                                        <DrawerItem
                                                  onPress={() => navigation.navigate('ReportTab')}
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
                                        <DrawerItem onPress={() => navigation.navigate('Home')}  label="Accueil" icon={({ focused, size, color}) => {
                                                  return <AntDesign name="home" size={size} color={primaryColor} />
                                        }} />
                                        <DrawerItem onPress={() => navigation.navigate('Settings')}  label="Paramètres" icon={({ focused, size, color}) => {
                                                  return <AntDesign name="setting" size={size} color={primaryColor} />
                                        }} />
                                        <DrawerItem onPress={toggleAffectation} style={{width: '100%'}} label={() => <View style={styles.affectationLabel}>
                                                  <Text>Activités</Text>
                                                  {showAffectations ? <AntDesign name="caretup" size={16} color="#777" /> :
                                                  <AntDesign name="caretdown" size={16} color="#777" />}
                                                  </View>}
                                                  icon={({ focused, size, color}) => {
                                                  return <FontAwesome5 name="tasks" size={24} color={primaryColor} />
                                        }} />
                                        { showAffectations && <UncompletedAffectations />}
                              </View>
                    </DrawerContentScrollView>
                    <View style={styles.bottomSection}>
                              <DrawerItem
                              style={{width: '100%'}}
                              icon={({ focused, size, color}) => {
                                        return <Feather name="moon" size={24} color={primaryColor} />
                              }}
                              label="Mode nuit"
                              />
                              <DrawerItem onPress={() => logout()} label="Déconnexion" icon={({ focused, size, color}) => {
                                        return <MaterialCommunityIcons name='exit-to-app' color={primaryColor} size={size} />
                              }} />
                    </View>
          </View>)
}