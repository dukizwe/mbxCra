import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 
import { Input, Menu } from 'native-base';
import Affectations from '../../components/Affectations/Affectations';
import AddButton from '../../components/AddButton/AddButton';
import { useDispatch, useSelector } from 'react-redux';
import { loadAffectations } from '../../store/actions/affectationsActions';
import { userSelector } from '../../store/selectors/userSelector';
import { FloatingAction } from "react-native-floating-action";
import { primaryColor } from '../../components/Welcome/styles';
import { useNavigation } from '@react-navigation/native';

export default function AffectationsScreen() {
          const [search, setSearch] = useState('')
          const user = useSelector(userSelector)
          const dispatch = useDispatch()
          const navigation = useNavigation()
          const onChange = (value) => {
                    setSearch(value)
                    dispatch(loadAffectations(user?.collaboId, value))
          }
          const actions = [
                    {
                              text: "Activité non planifié",
                              icon: require("../../../assets/affectation.png"),
                              name: "activite",
                              position: 1
                    },
                    {
                              text: "Suicide",
                              icon: require("../../../assets/suicide.png"),
                              name: "suicide",
                              position: 2
                    },
          ]
          return (<>
                    <View style={styles.container}>
                              <View style={styles.titleSearch}>
                                        <Text style={styles.title}>Mes affectations</Text>
                                        <Menu onClose={() => onChange('')} placement='left' style={styles.searchMenu} w="300" trigger={(triggerProps) => {return (
                                                            <TouchableOpacity style={styles.searchButton} {...triggerProps}>
                                                                      <AntDesign name="search1" size={24} color="black" />
                                                            </TouchableOpacity>
                                                            )
                                                  }}
                                                  >
                                                  <Menu.Item>
                                                            <Input autoFocus style={styles.searchInput}  value={search} onChangeText={ onChange} mt={2} placeholder="Recherche..." size='lg' py={2} />
                                                  </Menu.Item>
                                        </Menu>
                                        
                              </View>
                              <Affectations />
                              <FloatingAction
                                        actions={actions}
                                        onPressItem={name => {
                                                  if(name == 'suicide') {
                                                            navigation.navigate('Suicide')
                                                  } else {
                                                            navigation.navigate('NonPlanifie')
                                                  }
                                        }}
                                        color={primaryColor}
                              />
                              {/* <AddButton /> */}
                    </View>
          </>)
}

const styles = StyleSheet.create({
          container: {
                    backgroundColor: '#fff',
                    height: '100%',
          },
          titleSearch: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
          },
          title: {
                    color: '#333',
                    fontSize: 20,
                    fontWeight: 'bold',
                    paddingLeft: 15,
          },
          searchButton: {
                    padding: 20
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
          searchMenu: {
                    borderWidth: 0,
                    backgroundColor: 'transparent',
                    margin: 0,
                    paddingTop: 0,
          },
          searchInput: {
                    backgroundColor: '#fff',
                    width: '100%'
          }
});
