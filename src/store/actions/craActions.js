import { fetchApi } from "../../functions"
import { ADD_CRA_ACTION, APPEND_CRA_ACTION, PREPEND_CRA_ACTION } from "../reducers/craReducer"

export const appendCrasAction = (cras) => {
          return {
                    type: APPEND_CRA_ACTION,
                    payload: cras
          }
}

export const prependCrasAction = (cras) => {
          return {
                    type: PREPEND_CRA_ACTION,
                    payload: cras
          }
}

export const addCrasAction = (cras) => {
          return {
                    type: ADD_CRA_ACTION,
                    payload: cras
          }
}

export const loadCrasAction = (collaboId) => async (dispatch) => {
          try {
                    const fetchedCras = await fetchApi('http://192.168.43.235:8080/Afficher_cra/'+collaboId)
                    dispatch(addCrasAction(fetchedCras))
          } catch (error) {
                    console.log(error)
          }
}