import React, {Component} from "react";
import {
    updateAppointInterval,
    getAppointmentInterval,
    getAppointments,
    getDoctors,
    addAppointement,
    finishAppointment
} from "../Actions/AuthAction";
import {connect} from "react-redux";

class FinishAppointment extends Component{

    componentDidMount() {
        this.props.getAppointments();
        let { id } = this.props.match.params;
    }

    sendData = () => {
        const statisticalCoupon = {
            mKB10Code:this.getDiagnoz.value,
            recommendation:this.getAppointment.value
        }

        console.log(statisticalCoupon)
        debugger

        let { id } = this.props.match.params;
        this.props.finishAppointment(statisticalCoupon, id)

    }

    getDiagnozFormat = (appointement) => {
        if (appointement && appointement.statisticalCoupon) {
            return appointement.statisticalCoupon.mkB10Code
        }
        return ''
    };

    getAppointmentFormat = (appointement) => {
        if (appointement && appointement.statisticalCoupon) {
            return appointement.statisticalCoupon.recommendation
        }
        return ''
    }

    getPatient(appointement) {
        if (appointement) {
            return (<div>
                Пациент
                <br/>
                {`${appointement.patient.lastName} ${appointement.patient.firstName} ${appointement.patient.middleName}`}
                <br/>
                {appointement.patient.birthDate.substring(0, 10)} дата рождения
                <br/>
                Обращение на {appointement.toDate.substring(0, 10)}
            </div>)
        }

        return '';
    }

    render() {
        let { id } = this.props.match.params;
        const appointement = this.props.appointments.find(a => a.id === id);
        console.log(appointement)
        return (
            <div align={'center'}>
                {this.getPatient(appointement)}
                <label>
                    Диагноз<br/>
                    <textarea
                        type={'textArea'} size={100} style={{height:'100px', textAlign:'start'}}
                        ref={(input) => this.getDiagnoz = input}
                        defaultValue={this.getDiagnozFormat(appointement)}/><br /><br />
                </label>
                <label>
                    Рекомендации<br/>
                    <textarea type={'text'}
                              size={100}
                              style={{height:'100px', textAlign:'start'}}
                              ref={(input) => this.getAppointment = input} defaultValue={this.getAppointmentFormat(appointement)}/><br /><br />
                </label>
                <button onClick={this.sendData}>Сохранить</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return  {
        doctors: state.doctors,
        appointments : state.appointments.filter(a => a.patient !== null)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAppointments: () => dispatch(getAppointments()),
        getAppointmentInterval: (id) => dispatch(getAppointmentInterval(id)),
        getDoctors: () => dispatch(getDoctors()),
        finishAppointment: (data, id) => dispatch(finishAppointment(data, id, () => {
            window.location.href = "/appointmentDoctor";
        }))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FinishAppointment);