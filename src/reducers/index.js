import { combineReducers } from 'redux'
import {doctors} from "./doctors";
import {patients} from "./patients";
import {appointmentIntervals} from "./appointmentIntervals";
import {appointments} from "./appointments";

export default combineReducers({
    doctors,
    patients,
    appointmentIntervals,
    appointments
});