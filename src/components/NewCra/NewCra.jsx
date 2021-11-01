import React, { useContext } from 'react'

import { NativeBaseProvider, Button, TextArea, Icon, Switch, HStack, ScrollView, useToast,} from 'native-base'
import { View, Text, TouchableWithoutFeedback, ActivityIndicator} from 'react-native'
import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation, useRoute } from '@react-navigation/core'
import { useState } from 'react'
import styles from '../NonPlanifie/styles'
import { AntDesign } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker'
import { primaryColor } from '../Welcome/styles';
import { CraContext } from '../../context/CraContext'
import useFetch from '../../hooks/useFecth'
import { fetchApi, randomInt } from '../../functions'
import { prependCrasAction } from '../../store/actions/craActions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { crasSeletor } from '../../store/selectors/crasSelector'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userSelector } from '../../store/selectors/userSelector'

export default function NewCra({ activite, setActivite }) {
          const navigation = useNavigation()
          const route = useRoute()
          const toast = useToast()
          const { affectation, setAffectation } = route.params
          const dispatch = useDispatch()
          const cras = useSelector(crasSeletor)
          const user = useSelector(userSelector)

          const isView = activite ? true : false // determine if is to view or to add new

          const [loading, setLoading] = useState(false)

          const IDActivite = activite ? activite.IDActivite : affectation.IDActivite

          const dateToday = isView ? new Date(activite.DATE_SAISIE_CRA) : new Date();
          const [loadingActivite, selectedActivite] = useFetch('http://app.mediabox.bi:3140/cr_activite/'+IDActivite)
          const [realise, setRealise] = useState(activite ? activite.Realisation : '')
          const [reste, setReste] = useState(activite ? activite.RESTE_A_FAIRE : '')
          const inEdit = useContext(CraContext)?.inEdit
          const fakeheuresDebut = []
          const fakeheuresFin = []
          for(let i = 7; i <= 18; i++ ) {
                    const date = new Date()
                    date.setHours(i, 30)
                    // const value = date.toJSON().slice(0, 19).replace('T', ' ')
                    const heure = { label: `${i}:30:00`, value: date }
                    fakeheuresDebut.push(heure)
          }
          for(let i = 8; i <= 18; i++ ) {
                    const date = new Date()
                    date.setHours(i, 30)
                    // const value = date.toJSON().slice(0, 19).replace('T', ' ')
                    const heure = { label: `${i}:30:00`, value: date }
                    fakeheuresFin.push(heure)
          }

          //heures de debut
          const [heuresDebut, setHeuresDebut] = useState(fakeheuresDebut)
          const [showDebut, setShowDebut] = useState(false)
          const [selectedDebut, setSelectedDebut] = useState(new Date())

          // heures de fin
          const [heuresFin, setHeuresFin] = useState(fakeheuresFin)
          const [showFin, setShowFin] = useState(false)
          const [selectedFin, setSelectedFin] = useState(new Date())

          const [statut, setStatut] = useState(false)

          const isValid = realise != '' && selectedDebut != '' && selectedFin != '' && reste != ''
          
          const onSubmit = async () => {
                    setLoading(true)
                              const data = {
                                        // EMAIL_COLLABO: 'email@gm.com',
                                        // DATE_CRA: new Date().toJSON().slice(0, 19).replace('T', ' '),
                                        // DATE_SAISIE_CRA: new Date().toJSON().slice(0, 19).replace('T', ' '),
                                        ID_COLLABO: user.collaboId,
                                        ID_ACTIVITE: IDActivite,
                                        REALISATION: realise,
                                        HEURE_DEBUT: selectedDebut.toJSON().slice(0, 19).replace('T', ' '),
                                        HEURE_FIN: selectedFin.toJSON().slice(0, 19).replace('T', ' '),
                                        RESTE_A_FAIRE: reste,
                                        ACTIVITE_FINIE: statut
                              }
                              if(inEdit) {
                                        try {
                                                  let activiteResponse = await fetchApi('http://app.mediabox.bi:3140/cras/'+activite.ID_CRA, {
                                                            method: 'PUT',
                                                            body: JSON.stringify(data),
                                                            headers: {
                                                                      'Content-Type': 'application/json'
                                                            }
                                                  });
                                                  activiteResponse.Activite = selectedActivite[0] ? selectedActivite[0].label : 'Activité',
                                                  activiteResponse.ActiviteFinie = statut
                                                  if(setActivite) {
                                                            setActivite(activiteResponse)
                                                  }
                                                  await AsyncStorage.removeItem('cras')
                                                  dispatch(prependCrasAction(activiteResponse))
                                                  setLoading(false)
                                                  navigation.navigate('CraTab')
                                                  toast.show({
                                                            title: "Modification du CRA réussi",
                                                            placement: "bottom",
                                                            status: 'success',
                                                            duration: 2000
                                                  })
                                        } catch (error) {
                                                  console.log(error)
                                                  setLoading(false)
                                                  toast.show({
                                                            title: "CRA non modifié",
                                                            placement: "bottom",
                                                            status: 'error',
                                                            duration: 2000
                                                  })
                                        }
                              } else {
                                        try {
                                                  let activiteResponse = await fetchApi('http://app.mediabox.bi:3140/Enregistre_cra', {
                                                            method: 'POST',
                                                            body: JSON.stringify(data),
                                                            headers: {
                                                                      'Content-Type': 'application/json'
                                                            }
                                                  });
                                                  activiteResponse.Activite = selectedActivite[0] ? selectedActivite[0].label : 'Activité',
                                                  activiteResponse.DATE_SAISIE_CRA = new Date()
                                                  activiteResponse.ActiviteFinie = statut
                                                  if(statut && setAffectation) {
                                                            setAffectation(aff => ({...aff, ActiviteFinie: 1}))
                                                  }
                                                  await AsyncStorage.setItem('cras', JSON.stringify({ cras: [activiteResponse, ...cras] }))
                                                  dispatch(prependCrasAction(activiteResponse))
                                                  setLoading(false)
                                                  navigation.navigate('CraTab')
                                                  toast.show({
                                                            title: "Ajout du CRA réussi",
                                                            placement: "bottom",
                                                            status: 'success',
                                                            duration: 2000
                                                  })
                                        } catch (error) {
                                                  console.log(error, data)
                                                  setLoading(false)
                                                  toast.show({
                                                            title: "CRA non ajouté",
                                                            placement: "bottom",
                                                            status: 'error',
                                                            duration: 2000
                                                  })
                                        }
                              }
          }
          /**
           * Determiner si on peut activer ou non le bouton d'envoi
           * @returns { bool }
           */
          const canIDisabled = () => {
                    if(isView) {
                              if(inEdit && isValid) {
                                        return false
                              }
                              return true
                    } else {
                              if(!isValid) {
                                        return true
                              }
                    }
          }
          return (
                   
                    <NativeBaseProvider>
                              <ScrollView style={styles.container}>
                                        <View style={styles.datePickerButton}>
                                                  <View style={styles.iconDebutName}>
                                                            <MaterialIcons name="calendar-today"  size={24} color="#777" style={styles.icon} />
                                                            <Text style={styles.debutName}>Date CRA</Text>
                                                  </View>
                                                  <View style={styles.rightDate}>
                                                            <Text style={styles.rightDateText}>{`${dateToday.getDate()}/${dateToday.getMonth() + 1}/${dateToday.getFullYear()}`}</Text>
                                                  </View>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                                <Text style={styles.label}>Activité</Text>
                                                {loadingActivite && <ActivityIndicator color="#007BFF" isLoading={loadingActivite}/>}
                                        </View>
                                        <DropDownPicker
                                                  items={selectedActivite}
                                                  placeholder={selectedActivite[0] ? selectedActivite[0].label : ''}
                                                  style={{...styles.selectContainer, zIndex: 1}}
                                                  showArrowIcon={true}
                                                  ArrowUpIconComponent={({ style }) => <AntDesign name="caretup" size={16} color="#777" />}
                                                  ArrowDownIconComponent={({ style }) => <AntDesign name="caretdown" size={16} color="#777" />}
                                                  dropDownContainerStyle={styles.dropdownBox}
                                                  itemSeparator={true}
                                                  itemSeparatorStyle={{ opacity: 0.1}}
                                                  listItemLabelStyle={{ fontSize: 16}}
                                                  disabled
                                        />
                                        <TextArea  isDisabled={isView && !inEdit}
                                                  value={realise} onChangeText={(newValue) => setRealise(newValue)}
                                                  mt={2} placeholder="Réalisées" size='lg' pt={0} InputLeftElement={
                                                  <Icon
                                                            as={<MaterialIcons name="list-alt" size={24} color="black" />}
                                                            size={5}
                                                            ml="2"
                                                            color="muted.400"
                                                  />}
                                        />
                                        <Text style={styles.label}>De</Text>
                                        <DropDownPicker
                                                  open={showDebut}
                                                  setOpen={setShowDebut}
                                                  items={heuresDebut}
                                                  setItems={setHeuresDebut}
                                                  value={selectedDebut}
                                                  setValue={setSelectedDebut}
                                                  placeholder="Selectionner l'heure"
                                                  style={styles.selectContainer}
                                                  showArrowIcon={true}
                                                  ArrowUpIconComponent={({ style }) => <AntDesign name="caretup" size={16} color="#777" />}
                                                  ArrowDownIconComponent={({ style }) => <AntDesign name="caretdown" size={16} color="#777" />}
                                                  dropDownContainerStyle={styles.dropdownBox}
                                                  itemSeparator={true}
                                                  itemSeparatorStyle={{ opacity: 0.1}}
                                                  listItemLabelStyle={{ fontSize: 16}}
                                                  disabled={isView && !inEdit}
                                        />
                                        <Text style={styles.label}>À</Text>
                                        <DropDownPicker
                                                  open={showFin}
                                                  setOpen={setShowFin}
                                                  items={heuresFin}
                                                  setItems={setHeuresFin}
                                                  value={selectedFin}
                                                  setValue={setSelectedFin}
                                                  placeholder="Selectionner l'heure"
                                                  style={{...styles.selectContainer, zIndex: 1}}
                                                  showArrowIcon={true}
                                                  ArrowUpIconComponent={({ style }) => <AntDesign name="caretup" size={16} color="#777" />}
                                                  ArrowDownIconComponent={({ style }) => <AntDesign name="caretdown" size={16} color="#777" />}
                                                  dropDownContainerStyle={styles.dropdownBox}
                                                  itemSeparator={true}
                                                  itemSeparatorStyle={{ opacity: 0.1}}
                                                  listItemLabelStyle={{ fontSize: 16}}
                                                  disabled={isView && !inEdit}
                                        />
                                        <TextArea isDisabled={isView && !inEdit}
                                                  value={reste}  onChangeText={(newValue) => setReste(newValue)}
                                                  mt={2} placeholder="Reste à faire" size='lg' pt={0} InputLeftElement={
                                                  <Icon
                                                            as={<MaterialIcons name="pending-actions" size={24} color="black" />}
                                                            size={5}
                                                            ml="2"
                                                            color="muted.400"
                                                  />}
                                        />
                                        <HStack space={4} alignItems="center" style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10}}>
                                                  <TouchableWithoutFeedback onPress={() => setStatut(e => !e)}>
                                                            <Text style={styles.label}>Marquer comme finie</Text>
                                                  </TouchableWithoutFeedback>
                                                  <Switch isChecked={statut} onChange={() => setStatut(e => !e)} colorScheme="primary" />
                                        </HStack>
                                        <View style={styles.actions}>
                                                  <Button
                                                            isDisabled={canIDisabled()}
                                                            isLoading={loading}
                                                            onPress={onSubmit}
                                                            size='lg' w="full" mt={10}
                                                            style={styles.login} py={4} backgroundColor={primaryColor} _text={{ fontSize: 18}} borderRadius={10}
                                                            >Enregistrer</Button>
                                        </View>
                              </ScrollView>
                    </NativeBaseProvider>
          )
}