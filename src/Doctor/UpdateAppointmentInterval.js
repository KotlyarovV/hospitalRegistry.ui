import React, {Component} from "react";
import {updateAppointInterval, getAppointmentInterval} from "../Actions/AuthAction";
import {connect} from "react-redux";

class UpdateAppointmentInterval extends Component{

    getTime(time) {
        if (time)
            return time.substring(11, 16);
        return '';
    }

    getDateForm = (time) => {
        if (time) {
            return time.substring(0, 10);
        }

        return ''
    }

    componentDidMount() {
        let { id } = this.props.match.params;
        this.props.getAppointmentInterval();
    }

    concatTime(data, time) {
        const formattedDate = `${data}T${time}`;
        return formattedDate;
    }

    sendData = () => {
        const date = this.getDate.value;
        const startTime = this.concatTime(date, this.getStartTime.value);
        const endTime = this.concatTime(date, this.getEndTime.value);

        const appointInterval = {
            startTime:startTime,
            endTime:endTime,
            archived:{
                toJSON : () => {return false;}
            },
            location:this.getLocation.value
        };

        let { id } = this.props.match.params;

        this.props.updateAppointInterval(appointInterval, id);
    };

    render() {

        let { id } = this.props.match.params;
        let interval = {};
        const intervals =  this.props.appointmentIntervals.filter(f => f.id == id);

        if (intervals.length !== 0) {
            interval = intervals[0];
            console.log(interval)
        }

        return (
            <div align={'center'}>
                <label>
                    Дата приема<br/>
                    <input
                        ref={(input) => this.getDate = input} defaultValue={this.getDateForm(interval.startTime)}
                        type="date" id="start" name="trip-start"/><br/><br/>
                </label>
                <label>
                    Начало приема<br/>
                    <input type="time" ref={(input) => this.getStartTime = input} defaultValue={this.getTime(interval.startTime)}/>
                </label><br/><br/>
                <label>
                    Конец приема<br/>
                    <input type="time" ref={(input) => this.getEndTime = input} defaultValue={this.getTime(interval.endTime)}/>
                </label><br/><br/>
                <label>
                    Кабинет<br/>
                    <input type={'text'} ref={(input) => this.getLocation = input} defaultValue={interval.location}/><br /><br />
                </label>
                <button onClick={this.sendData}>Сохранить</button>
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
        updateAppointInterval: (data, id) => dispatch(updateAppointInterval(data, id, () => {window.location.href = "/appointmentIntervals"})),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAppointmentInterval);