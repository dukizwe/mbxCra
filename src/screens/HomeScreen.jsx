import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Header from '../components/Header/Header';

import Affectations from '../components/Affectations/Affectations';
import AddButton from '../components/AddButton/AddButton';
import HomeContext from '../context/HomeContext';

export default function HomeScreen({ navigation }) {
          const [formActive, setFormActive] = useState(false)

          const [affectations, setAffectations] = useState([])
          const [loading, setLoading] = useState(true)
          useEffect(() => {
                    (async function() {
                              // const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
                              // const data = await response.json()
                              setLoading(false)
/*                               if(response.ok) {
                                        setTodos(data)
                              } */
                              setAffectations([{
                                        id: 1,
                                        projet: 'Intégration DEVS',
                                        activite: "Création d'un blog",
                                        tache: 'Intégration DEVS-DGPC',
                                        dateDebut: '24-10-2021',
                                        dateFin: '30-10-2021',
                              }, {
                                        id: 2,
                                        projet: 'Intégration DEVS',
                                        activite: "Formations sur react native",
                                        tache: 'Intégration DEVS-DGPC',
                                        dateDebut: '24-10-2021',
                                        dateFin: '30-10-2021',
                              },{
                                        id: 1,
                                        projet: 'Intégration DEVS',
                                        activite: "Création d'un blog",
                                        tache: 'Intégration DEVS-DGPC',
                                        dateDebut: '24-10-2021',
                                        dateFin: '30-10-2021',
                              }, {
                                        id: 2,
                                        projet: 'Intégration DEVS',
                                        activite: "Formations sur react native",
                                        tache: 'Intégration DEVS-DGPC',
                                        dateDebut: '24-10-2021',
                                        dateFin: '30-10-2021',
                              }])
                    })()
          }, [])
          const value = {
                    navigation,
                    affectations,
          }
          return (
                    <View style={styles.container}>
                              <HomeContext.Provider value={value}>
                                        <Header />
                                        <View >
                                                  <Text style={styles.other}>Other</Text>
                                        </View>
                                        {loading ? 
                                        <ActivityIndicator color="#007BFF" animating={loading}/> : 
                                        <Affectations /> }
                                        <AddButton />
                              </HomeContext.Provider>
                    </View>
          );
}

const styles = StyleSheet.create({
          container: {
                    backgroundColor: '#fff',
                    height: '100%',
                    // marginTop: StatusBar.currentHeight
          },
          other: {
                    color: '#333',
                    paddingTop: 20,
                    paddingBottom: 20,
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    paddingRight: 15
          },
          input: {
                    borderBottomWidth: 2,
                    borderBottomColor: '#ddd',
          },
          fakeElement: {
                    position: 'absolute',
                    zIndex: 2,
                    backgroundColor: '#00000096',
                    width: '100%',
                    height: '100%'
          },
});
