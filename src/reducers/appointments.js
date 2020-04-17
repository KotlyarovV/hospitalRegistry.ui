import * as Constants from "../constants"

export function appointments(state = [], action) {
    switch (action.type) {
        case Constants.APPOINTMENTS_FETCH_SUCCESS:
            return action.appointments;
        default:
            return state;
    }
}