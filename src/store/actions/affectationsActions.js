import { ADD_AFFECTATIOS_ACTION, APPEND_AFFECTATIONS_ACTION, PREPEND_AFFECTATION_ACTION } from "../reducers/affectationsReducer"

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