import { useNavigation } from '@react-navigation/core'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'

const AffectationDate = ({dateDebut, dateFin}) => {
          return (
                    <View>
                              <Text>{ dateDebut }</Text>
                              <Text>{ dateFin }</Text>
                    </View>
          )
}

export default function Affectation({ affectation }) {
          const navigation = useNavigation()
          const handlePress = () => {
                    navigation.navigate('NewCla', { affectation })
          }
          return (
                    <TouchableOpacity style={styles.affectation} onPress={handlePress}>
                              <View style={styles.circleName}>
                                        <Feather name="circle" size={24} color="#777" />
                                        <View style={styles.affectationNames}>
                                                  <Text style={styles.activiteName} numberOfLines={1} >{ affectation.activite }</Text>
                                                  <Text style={styles.projetName} numberOfLines={1} >{ affectation.projet }</Text>
                                        </View>
                              </View>
                              {/* <AffectationDate dateDebut={affectation.dateDebut} dateFin={affectation.dateFin} /> */}
                    </TouchableOpacity>
          )
}
const styles = StyleSheet.create({
          affectation: {
                    backgroundColor: '#F2F5FE',
                    padding: 20,
                    borderRadius: 10,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 5
          },
          circleName: {
                    flexDirection: 'row',
                    alignItems: 'center',
          },
          affectationNames: {
                    marginLeft: 20,
                    width: '80%',
                    color: '#333',
          },
          activiteName: {
                    color: '#333',
                    fontSize: 16,
                    fontWeight: 'bold'
          },
          projetName: {
                    color: '#333',
                    opacity: 0.6
          }
})