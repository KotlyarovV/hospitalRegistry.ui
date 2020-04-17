import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Auth from './Auths/Auth'
import DoctorListPage from './Admin/DoctorListPage'
import DoctorAddPage from './Admin/DoctorAddPage'
import DoctorUpdatePage from "./Admin/DoctorUpdatePage";
import PatientsListPage from "./Admin/PatientsListPage";
import {AdminMainPage} from './Admin/AdminMainPage'
import {DoctorMainPage} from "./Doctor/DoctorMainPage";
import PatientAddPage from "./Admin/PatientAddPage";
import PatientUpdatePage from "./Admin/PatientUpdatePage";
import AppointmentIntervalList from "./Doctor/AppointmentIntervalList";
import PatientsMainPage from './Patients/PatientsMainPage'
import AddAppointmentInterval from "./Doctor/AddAppointmentInterval";
import UpdateAppointmentInterval from "./Doctor/UpdateAppointmentInterval";
import AppointmentsList from "./Patients/AppointmentsList";
import AddAppointement from "./Patients/AddAppointement";
import DoctorAppointmentsList from "./Doctor/DoctorAppointmentsList";
import FinishAppointment from "./Doctor/FinishAppointment";

import './App.css';


export class Main extends Component {
    render() {

        return (
            <div >
                <main style={{textAlign: "center"}}>
                    <Switch>
                        <Route exact path='/' render={(props) => <App {...props}/>}/>
                        <Route path='/doctors' render={(props) => <DoctorListPage {...props}/>}/>
                        <Route path='/addDoctor' render={(props) => <DoctorAddPage {...props}/>}/>
                        <Route path='/updateDoctor/:id' render={(props) => <DoctorUpdatePage {...props}/>}/>
                        <Route path='/patients' render={(props) => <PatientsListPage {...props}/>}/>
                        <Route path='/addPatient' render={(props) => <PatientAddPage {...props}/>}/>
                        <Route path='/updatePatient/:id' render={(props) => <PatientUpdatePage {...props}/>}/>
                        <Route path='/appointmentIntervals' render={(props) => <AppointmentIntervalList {...props}/>}/>
                        <Route path='/addAppointmentInterval' render={(props) => <AddAppointmentInterval {...props}/>}/>
                        <Route path='/updateAppointmentInterval/:id' render={(props) => <UpdateAppointmentInterval {...props}/>}/>
                        <Route path='/appointments' render={(props) => <AppointmentsList {...props}/>}/>
                        <Route path='/addAppointment' render={(props) => <AddAppointement {...props}/>}/>
                        <Route path='/appointmentDoctor' render={(props) => <DoctorAppointmentsList {...props}/>}/>
                        <Route path='/finishAppointment/:id' render={(props) => <FinishAppointment {...props}/>}/>
                    </Switch>
                </main>
            </div>);
    }
}

function App() {

    const role = localStorage.getItem("role");

    let page;
    if (role === 'Administrator') {
        page = (<AdminMainPage/>)
    } else if (role === 'Doctor'){
        page = (<DoctorMainPage/>)
    } else if (role === 'Patient') {
        page = (<PatientsMainPage/>)
    } else {
        page = (<Auth/>);
    }

        return (
      <div className="App">
          {page}
      </div>
    );
}

export default App;
