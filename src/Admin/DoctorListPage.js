import React, {Component} from "react";
import {connect} from 'react-redux';
import {getDoctors} from '../Actions/AuthAction'

class DoctorListPage extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDoctors();
    }

    getPhone(doctor) {
        if (doctor.phone) {
            return doctor.phone
        }

        else return 'нет';
    }

    getTable() {

        const doctorsRender = this.props.doctors.map(d => (
            <tr>
                <td>
                    {d.lastName} {d.firstName} {d.middleName}
                </td>
                <td>
                    {this.getPhone(d)}
                </td>
                <td>
                    {d.position.name}
                </td>
                <td>
                    {d.position.appointmentTimeInMinutes} минут
                </td>
                <td>
                    <button onClick={() => {window.location.href = `/updateDoctor/${d.id}`}}>Обновить</button>
                </td>
            </tr>));

        const table = (
          <table border={'1px'}>
              <tr>
                  <th>ФИО</th>
                  <th>телефон</th>
                  <th>должность</th>
                  <th>время приема</th>
                  <th></th>
              </tr>
              {doctorsRender}
          </table>
        );

        return table;
    }

    render() {
        console.log(this.props.doctors)
        return (
            <div align={'center'}>
                {this.props.doctors.length !== 0 ? this.getTable() : "Нет записей"}
                <br/>
                <button onClick={() => {window.location.href = "/addDoctor"}}>Добавить</button>
            </div>)
    }
}

const mapStateToProps = (state) => {
    return  {
        doctors: state.doctors
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        getDoctors: () => dispatch(getDoctors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorListPage);