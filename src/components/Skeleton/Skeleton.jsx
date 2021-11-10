import React from 'react'
import { View } from 'react-native'

export default function Skeleton({style}) {
          const defaultStyle = {
                    backgroundColor: '#dde1ed'
          }
          return <View style={{...defaultStyle, ...style}}>

          </View>
}