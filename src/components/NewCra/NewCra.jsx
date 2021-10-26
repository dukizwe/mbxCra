import React from 'react'

import { Center, Icon, Input, NativeBaseProvider, Stack, Heading, Radio, FormControl, HStack, Switch, Button, TextArea } from 'native-base'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons"
import { useState } from 'react'
import styles from './styles'

export default function NewCra() {
          const [isLoading, setLoading] = useState(false)
          const onSubmit = () => {
                    setLoading(true)
                    const timeout = setTimeout(() => {
                              setLoading(false)
                    }, 3000)
          }
          return (
                    <NativeBaseProvider>
                              <Center flex={1} px='3'>
                                        <Heading textAlign="center" mb="10">
                                                  Ajouter un nouveau CRA
                                        </Heading>
                                        <Stack space={4} w="80%" alignItems="center">
                                        <Input placeholder="Date CRA" size='sm' InputLeftElement={
                                                  <Icon
                                                            as={<MaterialIcons name="calendar-today" />}
                                                            size={5}
                                                            ml="2"
                                                            color="muted.400"
                                                  />}
                                                  InputRightElement={<View styles={styles.rightDate}><Text styles={styles.rightDateText}>26/10/2020</Text></View>}
                                        />
                                        <Input placeholder="Nom" size='sm' isRequired InputLeftElement={
                                                  <Icon
                                                            as={<MaterialIcons name="person" />}
                                                            size={5}
                                                            ml="2"
                                                            color="muted.400"
                                                  />}
                                        />
                                        <Button size='lg' w='full' onPress={onSubmit} isLoading={isLoading} variant='solid'>S'inscire</Button>
                                        </Stack>
                              </Center>
                    </NativeBaseProvider>
          )
}