import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons';
import styles from './styles';
import { Button, Menu, Modal, Input, Icon } from 'native-base';
import { primaryColor } from '../Welcome/styles';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors/userSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserAction } from '../../store/actions/userActions';

const PasswordModal = ({ showPasswordModal, setShowPasswordModal }) => {
          const changePassword = () => {

          }
          return (
                    <Modal isOpen={showPasswordModal} onClose={() => setShowPasswordModal(false)} size='xl'>
                              <Modal.Content maxWidth="400px">
                                        <Modal.CloseButton />
                                        <Modal.Header>Changer le mot de passe</Modal.Header>
                                        <Modal.Body>
                                                  <Input secureTextEntry mt={2} placeholder="Ancien mot de passe" size='lg' py={2} InputLeftElement={
                                                            <Icon
                                                                      as={<Feather name="lock" size={24} color="black" />}
                                                                      size={5}
                                                                      ml="2"
                                                                      color="muted.400"
                                                            />}
                                                  />
                                                  <Input secureTextEntry mt={2} placeholder="Nouveau mot de passe" size='lg' py={2} InputLeftElement={
                                                            <Icon
                                                                      as={<Feather name="lock" size={24} color="black" />}
                                                                      size={5}
                                                                      ml="2"
                                                                      color="muted.400"
                                                            />}
                                                  />
                                                  <Input secureTextEntry mt={2} placeholder="Confirme mot de passe" size='lg' py={2} InputLeftElement={
                                                            <Icon
                                                                      as={<Feather name="lock" size={24} color="black" />}
                                                                      size={5}
                                                                      ml="2"
                                                                      color="muted.400"
                                                            />}
                                                  />
                                        </Modal.Body>
                                        <Modal.Footer>
                                                  <Button.Group space={2}>
                                                            <Button
                                                                      variant="ghost"
                                                                      colorScheme="blueGray"
                                                                      onPress={() => {
                                                                                setShowPasswordModal(false)
                                                                      }}>Annuler</Button>
                                                            <Button onPress={changePassword} backgroundColor={primaryColor}>Changer</Button>
                                                  </Button.Group>
                                        </Modal.Footer>
                              </Modal.Content>
                    </Modal>
          )
}

export default function Header() {
          const [showPasswordModal, setShowPasswordModal] = useState(false)
          const user = useSelector(userSelector)
          const dispatch = useDispatch()

          const logout = async () => {
                    await AsyncStorage.removeItem('user')
                    await AsyncStorage.removeItem('affectations')
                    await AsyncStorage.removeItem('cras')
                    dispatch(setUserAction(null))
          }
          const ConnectedUser = () => {
                    return (
                              <View style={styles.connectedUser}>
                                        <View style={styles.userIcon}>
                                                  <AntDesign name="user" size={20} color="black" />
                                        </View>
                                        <Text style={styles.username}>{ user.email }</Text>
                                        <AntDesign name="caretdown" size={16} color="#777" style={{marginLeft: 10}} />
                              </View>
                    )
          }
          return (<View style={styles.header}>
                    <View style={styles.logoImage}>
                              <Image source={require('../../../assets/mbx_logo.png')} style={styles.image} />
                    </View>
                    <Menu placement='bottom' w="200" trigger={(triggerProps) => {return (
                                        <TouchableOpacity {...triggerProps}>
                                                  <ConnectedUser />
                                        </TouchableOpacity>
                                        )
                              }}
                              >
                              <Menu.Item onPress={() => setShowPasswordModal(true)}>Changer le mot de passe</Menu.Item>
                              <Menu.Item onPress={logout}>Déconnexion</Menu.Item>
                    </Menu>
                    <PasswordModal showPasswordModal={showPasswordModal} setShowPasswordModal={setShowPasswordModal} />
          </View>)
}