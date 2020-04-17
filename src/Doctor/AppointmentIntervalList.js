import React, {Component} from "react";
import {getAppointmentInterval} from "../Actions/AuthAction";
import {connect} from "react-redux";

class AppointmentIntervalList extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAppointmentInterval();
    }

    getTime(time) {
        return time.substring(11, 16);
    }

    getDate(time) {
        return time.substring(0, 10)
    }

    getTable() {

        const appointmentIntervalsRender = this.props.appointmentIntervals.map(d => (
            <tr>
                <td>
                    {this.getDate(d.startTime)}
                </td>
                <td>
                    {this.getTime(d.startTime)}
                </td>
                <td>
                    {this.getTime(d.endTime)}
                </td>
                <td>
                    {d.location}
                </td>
                <td>
                    <button onClick={() => {window.location.href = `/updateAppointmentInterval/${d.id}`}}>Обновить</button>
                </td>
            </tr>));

        const table = (
            <table border={'1px'}>
                <tr>
                    <th>Дата</th>
                    <th>Начало приема</th>
                    <th>Конец приема</th>
                    <th>Кабинет</th>
                    <th></th>
                </tr>
                {appointmentIntervalsRender}
            </table>
        );

        return table;
    }

    render () {
        console.log(this.props.appointmentIntervals);
        console.log(localStorage.getItem('id'));

        return (
            <div align={'center'}>
                {this.props.appointmentIntervals.length !== 0 ? this.getTable() : "Нет записей"}
                <br/>
                <button onClick={() => {window.location.href = "/addAppointmentInterval"}}>Добавить</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return  {
        appointmentIntervals: state.appointmentIntervals
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        getAppointmentInterval: () => dispatch(getAppointmentInterval(localStorage.getItem('id'))),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentIntervalList);