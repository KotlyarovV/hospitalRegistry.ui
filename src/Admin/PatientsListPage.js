import React, {Component} from "react";
import {connect} from 'react-redux';
import {getPatients} from '../Actions/AuthAction'

class PatientsListPage extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getPatients();
    }

    getPhone(patient) {
        if (patient.phone) {
            return patient.phone
        }

        else return 'нет';
    }

    getSex(patient) {
        if (patient.gender) {
            return 'м'
        }

        return "ж";
    }

    getTable() {

        const doctorsRender = this.props.patients.map(d => (
            <tr>
                <td>
                    {d.lastName} {d.firstName} {d.middleName}
                </td>
                <td>
                    {this.getPhone(d)}
                </td>
                <td>
                    {d.snils}
                </td>
                <td>
                    {this.getSex(d)}
                </td>
                <td>
                    {d.birthDate.substring(0, 10)}
                </td>
                <td>
                    {d.address}
                </td>
                <td>
                    <button onClick={() => {window.location.href = `/updatePatient/${d.id}`}}>Обновить</button>
                </td>
            </tr>));

        const table = (
            <table border={'1px'}>
                <tr>
                    <th>ФИО</th>
                    <th>телефон</th>
                    <th>СНИЛС</th>
                    <th>Пол</th>
                    <th>Дата рождения</th>
                    <th>Адрес</th>
                    <th></th>
                </tr>
                {doctorsRender}
            </table>
        );

        return table;
    }

    render() {
        return (
            <div align={'center'}>
                {this.props.patients.length !== 0 ? this.getTable() : "Нет записей"}
                <br/>
                <button onClick={() => {window.location.href = "/addPatient"}}>Добавить</button>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return  {
        patients: state.patients
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        getPatients: () => dispatch(getPatients()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientsListPage);