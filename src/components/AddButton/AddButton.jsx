import React from 'react'

import { StyleSheet, TouchableOpacity } from 'react-native'

import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';

export default function AddButton() {
          const navigation = useNavigation()
          return <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('NonPlanifie')}>
                    <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
}

const styles = StyleSheet.create({
          addBtn: {
                    backgroundColor: '#007BFF',
                    padding: 20,
                    width: 60,
                    height: 60,
                    borderRadius: 100,
                    position: 'absolute',
                    bottom: 30,
                    right: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'center',
          }
})