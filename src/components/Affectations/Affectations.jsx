import React, { useContext } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/core'
import HomeContext from '../../context/HomeContext'
import Affectation from './Affectation'



export default function Todos() {
          const { affectations } = useContext(HomeContext)
          return (
                    <FlatList style={styles.affectations} data={affectations} renderItem={({ item }) => (
                              <Affectation affectation={item} key={item.id} />
                    )} />
          )
}

const styles = StyleSheet.create({
          affectations: {
                    paddingLeft: 15,
                    paddingRight: 15,
                    marginBottom: 100
          },
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
          todoName: {
                    marginLeft: 20,
                    width: '80%',
                    fontSize: 16,
                    color: '#333'
          }
})