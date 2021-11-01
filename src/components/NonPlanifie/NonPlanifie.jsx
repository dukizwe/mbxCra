import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from './styles';
import { AntDesign } from '@expo/vector-icons'; 
import { MaterialIcons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Button, Icon, Input, NativeBaseProvider, TextArea, useToast } from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import { primaryColor } from '../Welcome/styles';
import { useNavigation } from '@react-navigation/core';
import { fetchApi } from '../../functions'
import { useSelector, useDispatch } from 'react-redux'
import { userSelector } from '../../store/selectors/userSelector'
import { affectationsSeletor } from '../../store/selectors/affectationsSelector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { prependAffectationsAction } from '../../store/actions/affectationsActions';


export default function NonPlanifieForm() {
          const toast = useToast()
          const navigation = useNavigation()
          const [loading, setLoading] = useState(false)
          const user = useSelector(userSelector)
          const dispatch = useDispatch()
          const affectations = useSelector(affectationsSeletor)
          
          // projet select
          const [openProjet, setOpenProjet] = useState(false);
          const [projet, setProjet] = useState(null);
          const [projects, setProjects] = useState([])
          const [loadingProjets, setLoadingProjets] = useState(true)
          const [loadingTache, setLoadingTache] = useState(false)
          useEffect(() => {
                    (async function() {
                              const projets = await fetchApi('http://app.mediabox.bi:3140/projet_get');
                              setLoadingProjets(false)
                              setProjects(projets)
                    })()
          }, [])
          // tache select
          const [openTach, setOpenTach] = useState(false);
          const [tacheValue, setTacheValue] = useState(null); 
          const [taches, setTacheItems] = useState([])
          const fetchTaches = async () => {
                    if(projet) {
                              setLoadingTache(true)
                              const taches = await fetchApi(`http://app.mediabox.bi:3140/Taches_get/${projet}`);
                              setTacheItems(taches)
                              setLoadingTache(false)
                    }
          }
          // dateDebut datePicker
          const [dateDebut, setDateDebut] = useState(new Date()); 
          const [showDateDebut, setShowDateDebut] = useState(false);
          const onChangeDateDebut = (event, selectedDate) => {
                    const currentDate = selectedDate || dateDebut;
                    setShowDateDebut(Platform.OS === "ios");
                    setDateDebut(currentDate);
          };
          
          // dateFin datePicker
          const [dateFin, setDateFin] = useState(new Date()); 
          const [showDateFin, setShowDateFin] = useState(false);
          const onChangeDateFin = (event, selectedDate) => {
                    const currentDate = selectedDate || dateFin;
                    setShowDateFin(Platform.OS === "ios");
                    setDateFin(currentDate);
          };

          // activite, nbr heures, commentaire
          const [activite, setActivite] = useState('')
          const [NbHeures, setHeures] = useState('')
          const [comment, setComment] = useState('')

          const isValid = projet != '' && tacheValue != '' && activite != '' && NbHeures != ''
          
          const submitForm = async () => {
                    setLoading(true)
                    try {
                              const affectationData = {
                                        IDTache: tacheValue,
                                        DescActivite: activite,
                                        DateDebutAct: new Date(dateDebut).toJSON().slice(0, 19).replace('T', ' '),
                                        DateFinPrev: new Date(dateFin).toJSON().slice(0, 19).replace('T', ' '),
                                        created_by: user.userid,
                                        NbHeureEstimees: NbHeures,
                                        Commentaires: comment,
                                        IDEmploye: user.collaboId,
                              }
                              const newAffectation = await fetchApi('http://app.mediabox.bi:3140/Enregistre_Activite', {
                                        method: 'POST',
                                        body: JSON.stringify(affectationData),
                                        headers: {
                                                  'Content-Type': 'application/json'
                                        }
                              });
                              const te = {...newAffectation, ...{
                                        DescActivite: activite,
                                        DateDebutAff: new Date(dateDebut),
                                        DateFin: new Date(dateFin),
                                        IDActivite: newAffectation.IDActivite
                               }}
                              await AsyncStorage.setItem('affectations', JSON.stringify({ affectations: [te, ...affectations] }))
                              dispatch(prependAffectationsAction(te))
                              setLoading(false)
                              navigation.goBack()
                              toast.show({
                                        title: "Ajout d'une affectation réussi",
                                        placement: "bottom",
                                        status: 'success',
                                        duration: 2000
                              })
                    } catch(error) {
                              console.log(error)
                              setLoading(false)
                              toast.show({
                                        title: "Affectation non ajouté",
                                        placement: "bottom",
                                        status: 'error',
                                        duration: 2000
                              })
                    }
          }

          return (
                    <NativeBaseProvider>
                              <ScrollView style={styles.container}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                                <Text style={styles.label}>Projet</Text>
                                                {loadingProjets && <ActivityIndicator color="#007BFF" isLoading={loadingProjets}/>}
                                        </View>
                                        <DropDownPicker
                                                  open={openProjet}
                                                  value={projet}
                                                  items={projects}
                                                  setOpen={setOpenProjet}
                                                  setValue={setProjet}
                                                  setItems={setProjects}
                                                  placeholder="Selectionner un projet"
                                                  style={styles.selectContainer}
                                                  showArrowIcon={true}
                                                  ArrowUpIconComponent={({ style }) => <AntDesign name="caretup" size={16} color="#777" />}
                                                  ArrowDownIconComponent={({ style }) => <AntDesign name="caretdown" size={16} color="#777" />}
                                                  dropDownContainerStyle={styles.dropdownBox}
                                                  itemSeparator={true}
                                                  itemSeparatorStyle={{ opacity: 0.1}}
                                                  listItemLabelStyle={{ fontSize: 16}}
                                                  onChangeValue={() => fetchTaches()}
                                                  disabled={loadingProjets}
                                        />
                                        <View style={{ flexDirection: 'row', alignItems: 'center', alignContent: 'center' }}>
                                                <Text style={styles.label}>Tâche</Text>
                                                {loadingTache && <ActivityIndicator color="#007BFF" isLoading={loadingTache}/>}
                                        </View>
                                        <DropDownPicker
                                                  open={openTach}
                                                  value={tacheValue}
                                                  items={taches}
                                                  setOpen={setOpenTach}
                                                  setValue={setTacheValue}
                                                  setItems={setTacheItems}
                                                  placeholder="Selectionner une tâche"
                                                  style={{...styles.selectContainer, zIndex: 1}}
                                                  showArrowIcon={true}
                                                  ArrowUpIconComponent={({ style }) => <AntDesign name="caretup" size={16} color="#777" />}
                                                  ArrowDownIconComponent={({ style }) => <AntDesign name="caretdown" size={16} color="#777" />}
                                                  dropDownContainerStyle={styles.dropdownBox}
                                                  itemSeparator={true}
                                                  itemSeparatorStyle={{ opacity: 0.1}}
                                                  listItemLabelStyle={{ fontSize: 16}}
                                        />
                                        <Input value={activite} onChangeText={(value) => setActivite(value)} mt={2} placeholder="Activité" size='lg' py={2} InputLeftElement={
                                                  <Icon
                                                            as={<Feather name="activity" size={24} color="black" />}
                                                            size={5}
                                                            ml="2"
                                                            color="muted.400"
                                                  />}
                                        />
                                        <TouchableOpacity style={styles.datePickerButton}  onPress={() => setShowDateDebut(true)}>
                                                  <View style={styles.iconDebutName}>
                                                            <MaterialIcons name="calendar-today"  size={24} color="#777" style={styles.icon} />
                                                            <Text style={styles.debutName}>Date début</Text>
                                                  </View>
                                                  <View style={styles.rightDate}>
                                                            <Text style={styles.rightDateText}>{`${dateDebut.getDate()}/${dateDebut.getMonth() + 1}/${dateDebut.getFullYear()}`}</Text>
                                                  </View>
                                        </TouchableOpacity>
                                        {showDateDebut && (
                                                  <DateTimePicker
                                                            testID="dateTimePicker"
                                                            value={dateDebut}
                                                            mode='date'
                                                            is24Hour={true}
                                                            display="default"
                                                            onChange={onChangeDateDebut}
                                                  />
                                        )}
                                        <TouchableOpacity style={styles.datePickerButton}  onPress={() => setShowDateFin(true)}>
                                                  <View style={styles.iconDebutName}>
                                                            <MaterialIcons name="calendar-today"  size={24} color="#777" style={styles.icon} />
                                                            <Text style={styles.debutName}>Date fin</Text>
                                                  </View>
                                                  <View style={styles.rightDate}>
                                                            <Text style={styles.rightDateText}>{`${dateFin.getDate()}/${dateFin.getMonth() + 1}/${dateFin.getFullYear()}`}</Text>
                                                  </View>
                                        </TouchableOpacity>
                                        {showDateFin && (
                                                  <DateTimePicker
                                                            testID="dateTimePicker"
                                                            value={dateFin} mode='date'
                                                            is24Hour={true} display="default"
                                                            onChange={onChangeDateFin}
                                                  />
                                        )}
                                        <Input keyboardType='number-pad'  value={NbHeures} onChangeText={(value) => setHeures(value)} mt={2} placeholder="NbHeures estimés" size='lg' py={2} InputLeftElement={
                                                  <Icon
                                                            as={<MaterialIcons name="access-time" size={24} color="black" />}
                                                            size={5}
                                                            ml="2"
                                                            color="muted.400"
                                                  />}
                                        />
                                        <TextArea  value={comment} onChangeText={(value) => setComment(value)} mt={2} placeholder="Commentaire" size='lg' pt={0} InputLeftElement={
                                                  <Icon
                                                            as={<MaterialCommunityIcons name="comment-outline" size={24} color="black" />}
                                                            size={5}
                                                            ml="2"
                                                            color="muted.400"
                                                  />}
                                        />
                                        <View style={styles.actions}>
                                                  <Button
                                                            isDisabled={!isValid}
                                                            isLoading={loading}
                                                            onPress={submitForm}
                                                            size='lg' w="full" mt={10}
                                                            style={styles.login} py={4} backgroundColor={primaryColor} _text={{ fontSize: 18}} borderRadius={10}
                                                            >Enregistrer</Button>
                                        </View>
                              </ScrollView>
                    </NativeBaseProvider>
                    )
}