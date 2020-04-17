import * as Constants from "../constants"

export function doctors(state = [], action) {
    switch (action.type) {
        case Constants.DOCTORS_FETCH_SUCCESS:
            return action.doctors;
        case Constants.DOCTOR_FETCH_SUCCESS:
            return action.doctor;
        default:
            return state;
    }
}