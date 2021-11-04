import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native'
import Affectation from './Affectation'
import { useDispatch, useSelector } from 'react-redux'
import { loadAffectations } from '../../store/actions/affectationsActions'
import { affectationsSeletor } from '../../store/selectors/affectationsSelector'
import { userSelector } from '../../store/selectors/userSelector'
import { primaryColor } from '../Welcome/styles'

export default function Affectations() {
          const [loading, setAffectationsLoading] = useState(true)
          const [refreshing, setRefreshing] = useState(false)
          const dispatch = useDispatch()
          const user = useSelector(userSelector)
          useEffect(() => {
                    dispatch(loadAffectations(user.collaboId))
                    setAffectationsLoading(false)
          }, [])

          const onRefresh = () => {
                    setRefreshing(true)
                    dispatch(loadAffectations(user.collaboId))
                    setRefreshing(false)
          }
          const affectations = useSelector(affectationsSeletor)
          return (
                    loading ? <ActivityIndicator color="#007BFF" animating={loading}/> :
                    <FlatList refreshControl={<RefreshControl colors={[primaryColor]} refreshing={refreshing} onRefresh={onRefresh} />} style={styles.affectations} data={affectations} renderItem={({ item }) => (
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