import AsyncStorage from "@react-native-async-storage/async-storage"
import { fetchApi } from "../../functions"
import { ADD_AFFECTATIOS_ACTION, APPEND_AFFECTATIONS_ACTION, FINIE_AFFECTATION, PREPEND_AFFECTATION_ACTION } from "../reducers/affectationsReducer"

export const appendAffectationsAction = (affectations) => {
          return {
                    type: APPEND_AFFECTATIONS_ACTION,
                    payload: affectations
          }
}

export const prependAffectationsAction = (affectations) => {
          return {
                    type: PREPEND_AFFECTATION_ACTION,
                    payload: affectations
          }
}

export const addAffectationsAction = (affectations) => {
          return {
                    type: ADD_AFFECTATIOS_ACTION,
                    payload: affectations
          }
}

export const loadAffectations = (collaboId) => async (dispatch) => {
          try {
                    const fetchedAffectations = await fetchApi('http://app.mediabox.bi:3140/Afficher_affectation/'+collaboId)
                    await AsyncStorage.setItem('affectations', JSON.stringify({ affectations: fetchedAffectations }))
                    return {
                              type: ADD_AFFECTATIOS_ACTION,
                              payload: fetchedAffectations
                    }
          } catch (error) {
                    console.log(error)
          }
}