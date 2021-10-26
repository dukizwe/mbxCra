import React, { useState } from 'react'
import { StyleSheet, View, Text, StatusBar, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity, Button } from 'react-native'
import { Feather } from '@expo/vector-icons'

export default function Header() {
          const categories = [
                              {
                                        name: 'All',
                                        id: 1,
                              }, {
                                        name: 'Work',
                                        id: 2,
                              }, {
                                        name: 'Personal',
                                        id: 3,
                              }, {
                                        name: 'Wishlist',
                                        id: 4
                              }
                    ];
          const [selectedCategory, setSelectedCategory] = useState(1)
          const selectedCategoryStyle = {
                    backgroundColor: '#007BFF',
                    color: '#fff'
          }
          const categoryStyle = (id) => selectedCategory === id ? ({...styles.category, ...selectedCategoryStyle}) : styles.category

          const handleCategoryPress = (category) => {
                    setSelectedCategory(category.id)
          }
          return (
                    <View style={styles.header}>
                              {categories.map((category, i) => {
                                        return <TouchableOpacity onPress={() => handleCategoryPress(category)} key={category.id}>
                                                  <Text style={categoryStyle(category.id)} >{category.name}</Text>
                                        </TouchableOpacity>
                              })}
                              <Feather name="more-vertical" size={24} color="black" />
                    </View>
          )
}

const styles = StyleSheet.create({
          header: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 30,
                    paddingLeft: 15,
                    paddingRight: 15
          },
          category: {
                    color: '#777',
                    backgroundColor: '#F2F5FE',
                    paddingTop: 10,
                    paddingBottom: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    borderRadius: 50
          }
})