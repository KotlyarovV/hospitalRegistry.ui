import * as Constants from "../constants"

export function appointmentIntervals(state = [], action) {
    switch (action.type) {
        case Constants.APPOINTMENT_INTERVALS_FETCH_SUCCESS:
            return action.appointmentIntervals;
        default:
            return state;
    }
}