import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import Affectation from './Affectation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { addAffectationsAction, finieAffectationAction, loadAffectations } from '../../store/actions/affectationsActions'
import { affectationsSeletor } from '../../store/selectors/affectationsSelector'
import { userSelector } from '../../store/selectors/userSelector'

export default function Affectations() {
          const [loading, setAffectationsLoading] = useState(true)
          const dispatch = useDispatch()
          const user = useSelector(userSelector)
          useEffect(() => {
                    (async function() {
                              //  await AsyncStorage.removeItem('affectations')
                              const defaultAffectationsString = await AsyncStorage.getItem('affectations')
                              const defaultAffectations = defaultAffectationsString ? JSON.parse(defaultAffectationsString)?.affectations : []
                              if(!defaultAffectations || defaultAffectations.length === 0) {
                                        dispatch(loadAffectations(user.collaboId))
                              } else {
                                        // load fetched affectations

                                        dispatch(addAffectationsAction(defaultAffectations))
                                        setAffectationsLoading(false)
                              }
                              setAffectationsLoading(false)
                    })()
          }, [loading])
          const affectations = useSelector(affectationsSeletor)
          return (
                    loading ? <ActivityIndicator color="#007BFF" animating={loading}/> :
                    <FlatList style={styles.affectations} data={affectations} renderItem={({ item }) => (
                              <Affectation affectation={item} key={item.IDAffectation}/>
                    )} />
          )
}

const styles = StyleSheet.create({
          affectations: {
                    paddingLeft: 15,
                    paddingRight: 15
          }
})