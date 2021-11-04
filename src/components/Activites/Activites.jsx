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
          const [loading, setActiviteLoading] = useState(true)
          const dispatch = useDispatch()
          const user = useSelector(userSelector)
          const activites = useSelector(crasSeletor)
          const [state, setState] = useState(false)
          useEffect(() => {
                    (async function() {
                              // await AsyncStorage.removeItem('cras')
                              const defaultCrasString = await AsyncStorage.getItem('cras')
                              const defaultCras = defaultCrasString ? JSON.parse(defaultCrasString)?.cras : []
                              if(!defaultCras || defaultCras.length === 0) {
                                        // fetch cras
                                        const response = await fetch('http://localhost:8080/Afficher_cra/'+user.collaboId)
                                        const fetchedCras = await response.json()
                                        if(response.ok) {
                                                  await AsyncStorage.setItem('cras', JSON.stringify({ cras: fetchedCras }))
                                                  dispatch(addCrasAction(fetchedCras))
                                                  setActiviteLoading(false)
                                        }
                              } else {
                                        // load fetched affectations
                                        dispatch(addCrasAction(defaultCras))
                                        setActiviteLoading(false)
                              }
                              })()
          }, [])
          return (
                    loading ? <ActivityIndicator color="#007BFF" animating={loading}/> :
                    <FlatList style={styles.activites} data={activites} renderItem={({ item }) => (
                              <Activite activite={item} key={item.IDActivite} setState={setState} />
                    )} />
          )
}

const styles = StyleSheet.create({
          activites: {
                    paddingLeft: 15,
                    paddingRight: 15
          },
})