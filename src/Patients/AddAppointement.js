import React, {Component} from "react";
import {connect} from 'react-redux';
import {getDoctors, getAppointmentInterval, addAppointement} from '../Actions/AuthAction'
import {positions} from "../Positions";

function distinct(collection, funcGetProperty) {
    const uniques = [...new Set(collection.map(funcGetProperty))];
    const result = uniques.map(u => collection.find(s => funcGetProperty(s) === u));
    return result;
}

class AddAppointement extends Component{

    componentDidMount() {
        this.props.getDoctors();
        console.log(this.props.doctors)
    }

    setPositions(position) {
        return () => {
            console.log(this.state.position)
            this.setState({position: position})
        }
    }

    handleSelectPosition = (event) => {
        console.log(event.target.value)
        const positions = this.props.doctors.map(d => d.position);
        const  uniquePositions = distinct(positions, p => p.id);
        const position = uniquePositions.find(f => f.id === event.target.value);
        this.setState({doctors: this.props.doctors});
    };

    handleSelectDoctor = (event) => {
        this.props.getAppointmentInterval(event.target.value)
    };

    handleSelectDate = (event) => {
        const appointments = this.props.appointmentIntervals;

        if (appointments) {
            const appointment = appointments.find(f => f.id === event.target.value)
            console.log("sad")
            console.log(appointment)
            let appointmentsa = appointment.appointments.filter(a => a.archived != true && a.isUsed != true);
            console.log(appointment.location)
            this.setState({...this.state, appointments: appointment.appointments, location: appointment.location})
        }
    };

    handleSelectTime = (event) => {
        const appointmentId = event.target.value;
        this.setState({...this.state, appointmentId: appointmentId})
    };

    getDateFormat(ap) {
        return ap.startTime.substring(0, 10);
    }

    sendData = () => {
        console.log("WRIIITE")
        this.props.addAppointement(this.state.appointmentId)
    };

    getButton = () => {
        if (this.state && this.state.appointmentId) {
            return (
                <div>
                    <label>Доктор принимает в {this.state.location} кабинете<br/><br/>
                        <button onClick={this.sendData}>Записать</button>
                    </label>
                </div>)
        }
    };

    render() {
        const positions = this.props.doctors.map(d => d.position);
        const  uniquePositions = distinct(positions, p => p.id);
        let doctors = [];

        if (this.state && this.state.doctors) {
            doctors = this.state.doctors;
        }

        let appointmentIntervals;

        if (this.props.appointmentIntervals) {
            appointmentIntervals = this.props.appointmentIntervals;
        }

        let appointments = [];

        if (this.state && this.state.appointments) {
            appointments = this.state.appointments;
        }

        console.log(uniquePositions);
        return (
            <div>
                <label>
                    Выберите нужного специалиста<br/>
                    <select ref={(input) => this.getPosition = input} name='Position' onChange={this.handleSelectPosition}>
                        <option disabled selected value> -- выберите специалиста -- </option>
                        {uniquePositions.map(p => (<option value={p.id}>{p.name}</option>))}
                    </select>
                </label>
                <br/>
                <label>
                    Выберите доктора<br/>
                    <select ref={(input) => this.getDoctor = input} name='Doctor' onChange={this.handleSelectDoctor}>
                        <option disabled selected value> -- выберите доктора -- </option>
                        {doctors.map(p => (<option value={p.id}>{p.lastName}</option>))}
                    </select>
                </label>
                <br/>
                <label>
                    Выберите дату приема<br/>
                    <select ref={(input) => this.getDate = input} name='Doctor' onChange={this.handleSelectDate}>
                        <option disabled selected value> -- выберите дату -- </option>
                        {appointmentIntervals.map(p => (<option value={p.id}>{this.getDateFormat(p)}</option>))}
                    </select>
                </label>
                <br/>
                <label>
                    Выберите время записи<br/>
                    <select ref={(input) => this.getTime = input} name='Time' onChange={this.handleSelectTime}>
                        <option disabled selected value> -- выберите время -- </option>
                        {appointments.map(p => (<option value={p.id}>{`${p.time.hours}:${p.time.minutes}`}</option>))}
                    </select>
                </label><br/>

                {this.getButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return  {
        appointmentIntervals: state.appointmentIntervals,
        doctors: state.doctors
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        getAppointmentInterval: (id) => dispatch(getAppointmentInterval(id)),
        getDoctors: () => dispatch(getDoctors()),
        addAppointement: (id) => dispatch(addAppointement(id, () => {
            alert("Запись была добавлена успешно, запишите дату, время и кабинет приема");
            window.location.href = "/";
        }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAppointement);