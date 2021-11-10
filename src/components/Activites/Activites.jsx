import React, { useContext, useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import Activite from './Activite'
import { addCrasAction, loadCrasAction } from '../../store/actions/craActions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { crasSeletor } from '../../store/selectors/crasSelector'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userSelector } from '../../store/selectors/userSelector'
import { primaryColor } from '../Welcome/styles'

export default function Activites() {
          const [loading, setActiviteLoading] = useState(true)
          const [refreshing, setRefreshing] = useState(false)
          const dispatch = useDispatch()
          const user = useSelector(userSelector)
          const [state, setState] = useState(false)
          useEffect(() => {
                    dispatch(loadCrasAction(user?.collaboId))
                    setActiviteLoading(false)
          }, [])

          const onRefresh = () => {
                    setRefreshing(true)
                    dispatch(loadCrasAction(user?.collaboId))
                    setRefreshing(false)
          }
          const activites = useSelector(crasSeletor)
          return (
                    loading ? <ActivityIndicator color="#007BFF" animating={loading}/> :
                    <FlatList
                              refreshControl={<RefreshControl
                                        colors={[primaryColor]}
                                        refreshing={refreshing} onRefresh={onRefresh} />}
                              style={styles.activites}
                              keyExtractor={(item, index) => index.toString()}
                              data={activites} renderItem={({ item }) => (
                                        <Activite activite={item} setState={setState} />
                    )} />
          )
}

const styles = StyleSheet.create({
          activites: {
                    paddingLeft: 15,
                    paddingRight: 15
          },
})