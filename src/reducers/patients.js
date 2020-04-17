import * as Constants from "../constants"

export function patients(state = [], action) {
    switch (action.type) {
        case Constants.PATIENTS_FETCH_SUCCESS:
            return action.patients;
        case Constants.PATIENT_FETCH_SUCCESS:
            return action.patient;
        default:
            return state;
    }
}