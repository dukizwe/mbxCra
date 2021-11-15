import React, { useState } from 'react'
import { Text, View, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import styles from './styles';

export default function SettingScreen() {
          const navigation = useNavigation()
          const [notifcation, setNotification] = useState(true)
          const toggleNotification = () => {
                    setNotification(bool => !bool)
          }
          const TouchOrView = (props) => {
                    if(!notifcation) {
                              return <View style={{opacity: 0.5}}>{props.children}</View>
                    } else {
                              return <TouchableNativeFeedback
                                        accessibilityRole="button"
                                        background={TouchableNativeFeedback.Ripple('#c9c5c5', false)}
                                        // onPress={() => toggleNotification()}
                              >{props.children}
                              </TouchableNativeFeedback>
                    }
          }
          return (
                    <View style={styles.settingsContent}>
                              <View  style={styles.header}>
                                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBack}>
                                                  <Ionicons name="arrow-back-outline" size={24} color="black" />
                                        </TouchableOpacity>
                                        <Text style={styles.headerTitle}>Paramètres</Text>
                              </View>
                              <View style={styles.settings}>
                                        <TouchableNativeFeedback
                                                  accessibilityRole="button"
                                                  background={TouchableNativeFeedback.Ripple('#c9c5c5', false)}
                                                  onPress={() => toggleNotification()}
                                        >
                                                  <View style={styles.settingItem}>
                                                            {notifcation ? <Feather name="bell" size={24} color="black" /> : <Feather name="bell-off" size={24} color="black" />}
                                                            <View style={styles.settingName}>
                                                                      <View style={styles.title}>
                                                                                <Text style={styles.settingTitle}>Notification</Text>
                                                                                <Text numberOfLines={1} style={styles.settingDescription}>Activer ou désactiver les notifications</Text>
                                                                      </View>
                                                            </View>
                                                  </View>
                                        </TouchableNativeFeedback>
                                        <TouchOrView>
                                                  <View style={styles.settingItem}>
                                                            <MaterialCommunityIcons name="comment-outline" size={24} color="#777" />
                                                            <View style={styles.settingName}>
                                                                      <View style={styles.title}>
                                                                                <Text style={styles.settingTitle}>Message de notification</Text>
                                                                                <Text numberOfLines={1} style={styles.settingDescription}>Recevoir une notification de compléter le CRA</Text>
                                                                      </View>
                                                            </View>
                                                  </View>
                                        </TouchOrView>
                              </View>
                    </View>
          )
}