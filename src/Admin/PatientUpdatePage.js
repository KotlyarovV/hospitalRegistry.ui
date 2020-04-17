import React, {Component} from "react";
import {updatePatient, getPatient} from "../Actions/AuthAction";
import {connect} from "react-redux";

class PatientUpdatePage extends Component{
    componentDidMount() {
        let { id } = this.props.match.params;
        this.props.getPatient(id);
    }

    sendData = () => {
        const patient = {
            firstName:this.getName.value,
            lastName:this.getLastName.value,
            middleName:this.getMiddleName.value,
            phone:this.getPhone.value,
            snils:this.getSnils.value,
            gender: {
                gender:this.getGender.value,
                toJSON : () => {
                    if (this.getGender.value == 'true') {
                        return true;
                    }
                    return false;
                }
            },
            birthDate:this.getBirthDate.value,
            address:this.getAddress.value
        };
        let { id } = this.props.match.params;

        this.props.updatePatient(patient, id);
    };

    getDefaultName() {
        if (this.props.patient) {
            return this.props.patient.firstName;
        }

        return '';
    }

    getDefaultLastName = () => {
        if (this.props.patient) {
            return this.props.patient.lastName;
        }

        return '';
    };

    getDefaultMiddleName() {
        if (this.props.patient) {
            return this.props.patient.middleName;
        }

        return '';
    }

    getDefaultPhone = () => {
        if (this.props.patient) {
            return this.props.patient.phone;
        }

        return '';
    };

    getDefaultSnils = () => {
        if (this.props.patient) {
            return this.props.patient.snils;
        }

        return '';
    };

    getDefaultGender = () => {
        if (this.props.patient) {
            console.log(this.props.patient.gender)
            if (this.getGender)
            this.getGender.value = this.props.patient.gender;
            return this.props.patient.gender;
        }

        return true;
    };

    getDefaultBirthDate = () => {
        if (this.props.patient) {
            console.log(this.props.patient.birthDate)
            if (this.props.patient.birthDate) {
                return this.props.patient.birthDate.substring(0, 10);
            }
            return '';
        }

        return '';
    };

    getDefaultAddress = () => {
        if (this.props.patient) {
            return this.props.patient.address;
        }

        return '';
    };

    render() {

        return (
            <div align={'center'}>
                <label>
                    Фамилия<br/>
                    <input type={'text'} ref={(input) => this.getLastName = input} defaultValue={this.getDefaultLastName()}/><br /><br />
                </label>
                <label>
                    Имя<br/>
                    <input type={'text'} ref={(input) => this.getName = input} defaultValue={this.getDefaultName()}/><br /><br />
                </label>
                <label>
                    Отчество<br/>
                    <input type={'text'} ref={(input) => this.getMiddleName = input} defaultValue={this.getDefaultMiddleName()}/><br /><br />
                </label>
                <label>
                    Телефон<br/>
                    <input type={'text'} ref={(input) => this.getPhone = input} defaultValue={this.getDefaultPhone()}/><br /><br />
                </label>
                <label>
                    СНИЛС<br/>
                    <input type={'text'} ref={(input) => this.getSnils = input} defaultValue={this.getDefaultSnils()}/><br /><br />
                </label>
                <label>
                    Пол<br/>
                    <select ref={(input) => this.getGender = input} defaultValue={this.getDefaultGender()} name='gender'>
                        <option value={true}>Мужской</option>
                        <option value={false}>Женский</option>
                    </select><br/><br/>
                </label>
                <label>
                    Дата рождения<br/>
                    <input
                        ref={(input) => this.getBirthDate = input}
                        type="date" id="start" name="trip-start"
                        defaultValue={this.getDefaultBirthDate()}/><br/><br/>
                </label>
                <label>
                    Адрес<br/>
                    <input type={'text'} ref={(input) => this.getAddress = input} defaultValue={this.getDefaultAddress()}/><br /><br />
                </label>
                <br/>
                <button onClick={this.sendData}>Отправить</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return  {
        patient: state.patients
    }
};


const mapDispatchToProps = (dispatch) => {

    return {
        getPatient:(id) => dispatch(getPatient(id)),
        updatePatient: (data, id) => dispatch(updatePatient(data, id, () => {window.location.href = "/patients"})),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientUpdatePage);