import React, {Component} from "react";
import {connect} from 'react-redux';
import {getDoctors, getAppointmentInterval, addAppointement, getAppointments} from '../Actions/AuthAction'
import {positions} from "../Positions";

function distinct(collection, funcGetProperty) {
    const uniques = [...new Set(collection.map(funcGetProperty))];
    const result = uniques.map(u => collection.find(s => funcGetProperty(s) === u));
    return result;
}

class AppointmentsList extends Component{

    componentDidMount() {
        this.props.getDoctors();
        this.props.getAppointments();
    }

    getDate(time) {
        return time.substring(0, 10)
    }

    getTime(time) {
        return `${time.hours}:${time.minutes}`
    }

    getRecomendation(d) {
        if (d.statisticalCoupon) {
            return d.statisticalCoupon.recommendation;
        }

        return 'Не заполнено'
    }

    getDiagnoz(d) {
        if (d.statisticalCoupon) {
            return d.statisticalCoupon.mkB10Code;
        }

        return 'Не заполнено'
    }

    getTable = () => {
        const appointments = this.props.appointments.map(d => (
            <tr>
                <td>
                    {this.getDate(d.toDate)}
                </td>
                <td>
                    {this.getTime(d.time)}
                </td>
                <td>
                    {d.doctor.lastName} {d.doctor.firstName} {d.doctor.middleName} ({d.doctor.position.name})
                </td>
                <td>
                    {d.location}
                </td>
                <td>
                    {this.getDiagnoz(d)}
                </td>
                <td>
                    {this.getRecomendation(d)}
                </td>
            </tr>));

        const table = (
            <table border={'1px'}>
                <tr>
                    <th>Дата</th>
                    <th>Время приема</th>
                    <th>Врач</th>
                    <th>Кабинет</th>
                    <th>Диагноз</th>
                    <th>Рекомендации с приема</th>
                </tr>
                {appointments}
            </table>
        );

        return table;
    }

    render() {

        return (
                <div align={'center'}>
                    {this.props.appointments.length !== 0 ? this.getTable() : "Нет записей"}
                    <br/>
                </div>
        )
    }
}

const mapStateToProps = (state) => {
    return  {
        doctors: state.doctors,
        appointments : state.appointments
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        getAppointments: () => dispatch(getAppointments()),
        getAppointmentInterval: (id) => dispatch(getAppointmentInterval(id)),
        getDoctors: () => dispatch(getDoctors()),
        addAppointement: (id) => dispatch(addAppointement(id, () => {
            alert("Запись была добавлена успешно, запишите дату, время и кабинет приема");
            window.location.href = "/";
        }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentsList);