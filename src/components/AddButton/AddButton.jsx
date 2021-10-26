import React, { useContext } from 'react'

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { AntDesign } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/core';
import HomeContext from '../../context/HomeContext';

export default function AddButton() {
          const { showForm } = useContext(HomeContext)
          const navigation = useNavigation()
          return <TouchableOpacity style={styles.addBtn} onPress={showForm}>
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