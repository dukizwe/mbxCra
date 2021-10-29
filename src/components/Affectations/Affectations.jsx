import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import Affectation from './Affectation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { addAffectationsAction } from '../../store/actions/affectationsActions'
import { affectationsSeletor } from '../../store/selectors/affectationsSelector'
import { userSelector } from '../../store/selectors/userSelector'

export default function Affectations() {
          const [loading, setLoading] = useState(true)
          const dispatch = useDispatch()
          const user = useSelector(userSelector)
          useEffect(() => {
                    (async function() {
                              //  await AsyncStorage.removeItem('affectations')
                              const defaultAffectationsString = await AsyncStorage.getItem('affectations')
                              const defaultAffectations = defaultAffectationsString ? JSON.parse(defaultAffectationsString)?.affectations : []
                              if(!defaultAffectations || defaultAffectations.length === 0) {
                                        try {
                                                  const response = await fetch('http://app.mediabox.bi:3140/Afficher_affectation/'+user.id)
                                                  const fetchedAffectations = await response.json()
                                                  if(response.ok) {
                                                            await AsyncStorage.setItem('affectations', JSON.stringify({ affectations: fetchedAffectations.data }))
                                                            dispatch(addAffectationsAction(fetchedAffectations.data))
                                                            setLoading(false)
                                                  }
                                        } catch (error) {
                                                  console.log(error, user)
                                        }
                              } else {
                                        // load fetched affectations
                                        console.log('second')
                                        dispatch(addAffectationsAction(defaultAffectations))
                                        setLoading(false)
                              }
                    })()
          }, [])
          const affectations = useSelector(affectationsSeletor)
          console.log(affectations)
          return (
                    loading ? <ActivityIndicator color="#007BFF" animating={loading}/> :
                    <FlatList style={styles.affectations} data={affectations} renderItem={({ item }) => (
                              <Affectation affectation={item} key={item.IDAffectation} />
                    )} />
          )
}

const styles = StyleSheet.create({
          affectations: {
                    paddingLeft: 15,
                    paddingRight: 15
          }
})