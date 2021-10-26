import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/core'
import { Button, Center, Heading, NativeBaseProvider } from 'native-base'
import React, { useEffect, useState } from 'react'

import { View, Text, Image } from 'react-native'
import styles, { primaryColor } from './styles'

export default function Welcome() {
          const navigation = useNavigation()
          const goToLogin = () => navigation.navigate('Login')
          return (
                    <NativeBaseProvider>
                              <Center flex={1} px='3' backgroundColor="#F2F5FE">
                                        <View style={styles.card}>
                                                  <Center flex={1}>
                                                            <View style={styles.imageContainer}>
                                                                      <Image source={require('../../../assets/mbx_logo.jpg')} style={styles.image}/>
                                                            </View>
                                                            <Heading mt={5} mb={5} style={{ fontSize: 25}} >App name</Heading>
                                                            <Text style={styles.wrapText}>
                                                                      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero 
                                                            </Text>
                                                            <View style={styles.actions}>
                                                                      <Button onPress={goToLogin} size='lg' w="full" style={styles.login} py={4} backgroundColor={primaryColor} _text={{ fontSize: 18}} borderRadius={10}>Se connecter</Button>
                                                                      <Button size='lg' w="full" style={styles.register} variant='outline' py={4} _text={{ color: '#333', fontSize: 18}}  borderColor={primaryColor} borderRadius={10}>S'inscrire</Button>
                                                            </View>
                                                  </Center>
                                        </View>
                              </Center>
                    </NativeBaseProvider>
          )
}