import { useNavigation } from '@react-navigation/core'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment';
import 'moment/locale/fr';
moment.locale('fr')

export default function Activite({ activite }) {
          console.log(activite)
          const navigation = useNavigation()
          const handleAffectationPress = () => {
                    navigation.navigate('ViewCra', { activite })
          }
          
          return (
                    <TouchableOpacity style={styles.activite} onPress={handleAffectationPress}>
                              <View style={styles.activiteNames}>
                                        <Text style={styles.activiteName} numberOfLines={3} >{ activite.Realisation }</Text>
                              </View>
                              <View style={styles.projetDate}>
                                        <Text style={styles.projetActiviteText} numberOfLines={1} >{ activite.Activite }</Text>
                                        <Text style={styles.projetDateText} numberOfLines={1} >{ moment(activite.DATE_SAISIE_CRA).fromNow() }</Text>
                              </View>
                    </TouchableOpacity>
          )
}
const styles = StyleSheet.create({
          activite: {
                    backgroundColor: '#F2F5FE',
                    padding: 10,
                    borderRadius: 10,
                    marginTop: 5
          },
          activiteNames: {
                    width: '95%',
                    color: '#333',
          },
          activiteName: {
                    color: '#333',
                    fontSize: 16,
                    fontWeight: 'bold'
          },
          projetDate: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 5
          },
          projetActiviteText: {
                    width: '40%',
                    opacity: 0.8
          },
          projetDateText: {
                    opacity: 0.5
          }
})