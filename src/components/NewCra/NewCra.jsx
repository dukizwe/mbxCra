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
import { CraContext } from '../../screens/ViewCraScreen'
import useFetch from '../../hooks/useFecth'
import { fetchApi, randomInt } from '../../functions'
import { prependCrasAction } from '../../store/actions/craActions'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { crasSeletor } from '../../store/selectors/crasSelector'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function NewCra({ activite }) {
          console.log(activite)
          const navigation = useNavigation()
          const route = useRoute()
          const toast = useToast()
          const { affectation } = route.params
          const dispatch = useDispatch()
          const cras = useSelector(crasSeletor)

          const isView = activite ? true : false // determine if is to view or to add new

          const [loading, setLoading] = useState(false)

          const dateToday = isView ? new Date(activite.DATE_SAISIE_CRA) : new Date();
          const [loadingActivite, selectedActivite, setActivite] = useFetch('http://192.168.43.235:8080/cr_activite/'+affectation?.IDActivite)
          const [realise, setRealise] = useState(activite?.Realisation)
          const [reste, setReste] = useState(activite?.RESTE_A_FAIRE)
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

          const isValid = inEdit ? true :  realise != '' && selectedDebut != '' && selectedFin != '' && reste != ''
          
          const onSubmit = async () => {
                    setLoading(true)
                              const timeOut = setTimeout(async () => {
                                        try {
                                                  const activite = {
                                                            Activite: selectedActivite[0] ? selectedActivite[0].label : 'Activité',
                                                            DATE_SAISIE_CRA: new Date(),
                                                            Debut: selectedDebut.toJSON().slice(0, 19).replace('T', ' '),
                                                            Fin: selectedFin.toJSON().slice(0, 19).replace('T', ' '),
                                                            IDActivite: affectation?.IDActivite || 2879,
                                                            ID_CRA: randomInt(5000, 10000),
                                                            NBR_HEURE_INV: selectedFin.getHours() - selectedDebut.getHours(),
                                                            RESTE_A_FAIRE: reste,
                                                            Realisation: realise
                                                  }
                                                  await AsyncStorage.setItem('affectations', JSON.stringify({ cras: [activite, ...cras] }))
                                                  dispatch(prependCrasAction(activite))
                                                  setLoading(false)
                                                  navigation.navigate('CraTab')
                                                  toast.show({
                                                            title: "Ajout du CRA réussi",
                                                            placement: "bottom",
                                                            status: 'success',
                                                            duration: 2000
                                                  })
                                        } catch (error) {
                                                  console.log(error)
                                                  setLoading(false)
                                                  toast.show({
                                                            title: "CRA non ajouté",
                                                            placement: "bottom",
                                                            status: 'error',
                                                            duration: 2000
                                                  })
                                        }
                              }, 2000)
                              return false
                              const data = {
                                        ID_COLLABO: 1,
                                        EMAIL_COLLABO: 'email@gm.com',
                                        DATE_CRA: new Date().toJSON().slice(0, 19).replace('T', ' '),
                                        DATE_SAISIE_CRA: new Date().toJSON().slice(0, 19).replace('T', ' '),
                                        ID_ACTIVITE: affectation?.IDActivite,
                                        REALISATION: realise,
                                        HEURE_DEBUT: selectedDebut.toJSON().slice(0, 19).replace('T', ' '),
                                        HEURE_FIN: selectedFin.toJSON().slice(0, 19).replace('T', ' '),
                                        RESTE_A_FAIRE: reste,
                                        ACTIVITE_FINIE: statut,
                                        NBR_HEURE_INV: selectedFin.getHours() - selectedDebut.getHours(),
                                        IS_WEEK_END: 0,
                                        TRAITE: 1
                              }
                    try {
                              const activiteResponse = await fetchApi('http://app.mediabox.bi:3140/Enregistre_cra', {
                                        method: 'POST',
                                        body: JSON.stringify(data),
                                        headers: {
                                                  'Content-Type': 'application/json'
                                        }
                              });
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
                                                            isDisabled={!isValid}
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