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