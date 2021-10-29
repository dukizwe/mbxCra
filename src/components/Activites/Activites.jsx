import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import Activite from './Activite'
import { addCrasAction } from '../../store/actions/craActions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { crasSeletor } from '../../store/selectors/crasSelector'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userSelector } from '../../store/selectors/userSelector'

export default function Activites() {
          const [loading, setLoading] = useState(true)
          const dispatch = useDispatch()
          const user = useSelector(userSelector)
          useEffect(() => {
                    (async function() {
                              // await AsyncStorage.removeItem('cras')
                              const defaultCrasString = await AsyncStorage.getItem('cras')
                              const defaultCras = defaultCrasString ? JSON.parse(defaultCrasString)?.cras : []
                              if(!defaultCras || defaultCras.length === 0) {
                                        // fetch cras
                                        console.log('first')
                                        const response = await fetch('http://app.mediabox.bi:3140/Afficher_cra/'+user.id)
                                        const fetchedCras = await response.json()
                                        if(response.ok) {
                                                  await AsyncStorage.setItem('cras', JSON.stringify({ cras: fetchedCras }))
                                                  dispatch(addCrasAction(fetchedCras))
                                                  setLoading(false)
                                        }
                              } else {
                                        // load fetched affectations
                                        console.log('second')
                                        dispatch(addCrasAction(defaultCras))
                                        setLoading(false)
                              }
                              })()
          }, [])
          const activites = useSelector(crasSeletor)
          return (
                    loading ? <ActivityIndicator color="#007BFF" animating={loading}/> :
                    <FlatList style={styles.activites} data={activites} renderItem={({ item }) => (
                              <Activite activite={item} key={item.id} />
                    )} />
          )
}

const styles = StyleSheet.create({
          activites: {
                    paddingLeft: 15,
                    paddingRight: 15
          },
})