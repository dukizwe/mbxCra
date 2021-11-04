import React from 'react'
import { Text } from "react-native";
import { useRoute } from '@react-navigation/core'

export default function AffectationViewScreen() {
          const route = useRoute()
          const { affectation } = route.params
          return <Text>{ JSON.stringify(affectation)}</Text>
}