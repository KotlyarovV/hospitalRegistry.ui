import * as Constants from "../constants"

const authUrl = 'https://localhost:44373/auth';
const doctorUrl = 'https://localhost:44373/doctor';
const patientsUrl = 'https://localhost:44373/patient';
const appointmentIntervalUrl = 'https://localhost:44373/appointmentInterval';
const appointmentUrl = 'https://localhost:44373/appointment';

function readBody(body) {
    return body.getReader().read()
}

function decode(byteArray) {
    return new TextDecoder("utf-8").decode(byteArray);
}

export function auth(data, changePage) {
    return (dispatch) => {
            fetch(authUrl, {
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            }).then(request => {
                if (request.ok) {
                    return  readBody(request.body);
                }

                throw new DOMException();
            }).then(data => {

                const body = decode(data.value);
                const json = JSON.parse(body);
                console.log(json)

                fetch(authUrl, {
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        "Authorization": `Bearer ${json.access_token}`
                    },
                    method: 'GET'
                }).then(response => {
                    if (response.ok) {
                        return readBody(response.body);
                    }
                }).then(body => {
                    const data = decode(body.value);
                    const jsonData = JSON.parse(data);
                    localStorage.setItem('role', jsonData.role);
                    localStorage.setItem('id', jsonData.id);
                    localStorage.setItem('access_token', json.access_token);
                    changePage();
                })
            });
    }
}

export function getDoctors() {
    return (dispath) => {
        fetch(doctorUrl, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'GET'
        }).then(request => {
            if (request.ok) {
                return  readBody(request.body);
            }
            throw new DOMException();
        }).then(data => {
            const body = decode(data.value);
            const json = JSON.parse(body);
            console.log(json);
            dispath(doctorsFetchDataSuccess(json));
        })
    };
}

export function doctorsFetchDataSuccess(doctors) {
    return {
        type : Constants.DOCTORS_FETCH_SUCCESS,
        doctors
    };
}

export function addDoctor(data, endAction) {
    return (dispatch) => {
        fetch(doctorUrl, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                endAction();
            } else {
                alert("Не получилось добавить доктора")
            }
        })
    }
}

export function updateDoctor(data, id, endAction) {
    return (dispatch) => {
        fetch(doctorUrl + `/${id}`, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'PUT',
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                endAction();
            } else {
                alert("Не получилось обновить информацию о докторе")
            }
        })
    }
}

export function getDoctor(id) {
    return (dispatch) => {
        fetch(doctorUrl + `/${id}`, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'GET'
        }).then(request => {
            if (request.ok) {
                return  readBody(request.body);
            }
            throw new DOMException();
        }).then(data => {
            const body = decode(data.value);
            const json = JSON.parse(body);
            console.log(json);
            dispatch(doctorFetchDataSuccess(json));
        })
    };
}

export function doctorFetchDataSuccess(doctor) {
    return {
        type : Constants.DOCTOR_FETCH_SUCCESS,
        doctor
    };
}

export function getPatients() {
    return (dispath) => {
        fetch(patientsUrl, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'GET'
        }).then(request => {
            if (request.ok) {
                return  readBody(request.body);
            }
            throw new DOMException();
        }).then(data => {
            const body = decode(data.value);
            const json = JSON.parse(body);
            console.log(json);
            dispath(patientsFetchDataSuccess(json));
        })
    };
}

export function patientsFetchDataSuccess(patients) {
    return {
        type : Constants.PATIENTS_FETCH_SUCCESS,
        patients
    };
}

export function getPatient(id) {
    return (dispatch) => {
        fetch(patientsUrl + `/${id}`, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'GET'
        }).then(request => {
            if (request.ok) {
                return  readBody(request.body);
            }
            throw new DOMException();
        }).then(data => {
            const body = decode(data.value);
            const json = JSON.parse(body);
            console.log(json);
            dispatch(patientFetchDataSuccess(json));
        })
    };
}

export function patientFetchDataSuccess(patient) {
    return {
        type : Constants.PATIENT_FETCH_SUCCESS,
        patient
    };
}

export function addPatient(data, endAction) {
    console.log(data);
    const jsonData = JSON.stringify(data);
    console.log(jsonData)
    return (dispatch) => {
        fetch(patientsUrl, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                endAction();
            } else {
                alert("Не получилось добавить пациента")
            }
        })
    }
}

export function updatePatient(data, id, endAction) {
    console.log(data)
    console.log(JSON.stringify(data))
    return (dispatch) => {
        fetch(patientsUrl + `/${id}`, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'PUT',
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                endAction();
            } else {
                alert("Не получилось обновить информацию о пациенте")
            }
        })
    }
}

export function getAppointmentInterval(doctorId) {
    return (dispatch) => {
        fetch(appointmentIntervalUrl + `/${doctorId}`, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'GET'
        }).then(request => {
            if (request.ok) {
                return  readBody(request.body);
            }
            throw new DOMException();
        }).then(data => {
            const body = decode(data.value);
            const json = JSON.parse(body);
            console.log(json);
            dispatch(appointmentIntervalsFetchDataSuccess(json));
        })
    }
}

export function appointmentIntervalsFetchDataSuccess(appointmentIntervals) {
    return {
        type : Constants.APPOINTMENT_INTERVALS_FETCH_SUCCESS,
        appointmentIntervals
    };
}

export function addAppointInterval(data, endAction) {
    return (dispatch) => {
        fetch(appointmentIntervalUrl + `/${localStorage.getItem('id')}`, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                endAction();
            } else {
                alert("Не получилось добавить запись о рабочем дне")
            }
        })
    }
}

export function updateAppointInterval(data, id, endAction) {
    return (dispatch) => {
        fetch(appointmentIntervalUrl + `/${id}`, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'PUT',
            body: JSON.stringify(data)
        }).then(response => {
            if (response.ok) {
                endAction();
            } else {
                alert("Не получилось обновить запись о рабочем дне")
            }
        })
    }
}

export function addAppointement(id, endAction) {
    return (dispatch) => {
        console.log("WRITTEN")
        fetch(appointmentUrl + `/${id}`, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'PUT',
            body: JSON.stringify({
                archived: {toJSON : () => {return false;}},
                patientId: localStorage.getItem('id'),
                statisticalCoupon: null
            })
        }).then(response => {
            if (response.ok) {
                endAction();
            } else {
                alert("Не получилось записатсья на прием")
            }
        })
    }
}

export function getAppointments() {
    return (dispatch) => {
        fetch(appointmentUrl, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'GET'
        }).then(request => {
            if (request.ok) {
                return  request.json()//readBody(request.body);
            }
            throw new DOMException();
        }).then(data => {
            console.log(data)
            dispatch(appointmentsFetchDataSuccess(data));
        })
    }
}

export function appointmentsFetchDataSuccess(appointments) {
    return {
        type : Constants.APPOINTMENTS_FETCH_SUCCESS,
        appointments
    };
}

export function finishAppointment(statisticalCoupon, patientId, endAction) {
    return (dispatch) => {
        console.log("WRITTEN")
        fetch(appointmentUrl + `/${patientId}/finish`, {
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${localStorage.getItem('access_token')}`
            },
            method: 'PUT',
            body: JSON.stringify({
                archived: {toJSON : () => {return false;}},
                patientId: localStorage.getItem('id'),
                statisticalCoupon: statisticalCoupon
            })
        }).then(response => {
            if (response.ok) {
                endAction();
            } else {
                alert("Не получилось записать информацию о пациенте")
            }
        })
    }
}