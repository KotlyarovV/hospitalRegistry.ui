import React, {Component} from "react";
import {addPatient} from "../Actions/AuthAction";
import {connect} from "react-redux";

class PatientAddPage extends Component{

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

        this.props.addPatient(patient);
    };


    render() {

        return (
            <div align={'center'}>
                <label>
                    Фамилия<br/>
                    <input type={'text'} ref={(input) => this.getLastName = input} /><br /><br />
                </label>
                <label>
                    Имя<br/>
                    <input type={'text'} ref={(input) => this.getName = input} /><br /><br />
                </label>
                <label>
                    Отчество<br/>
                    <input type={'text'} ref={(input) => this.getMiddleName = input} /><br /><br />
                </label>
                <label>
                    Телефон<br/>
                    <input type={'text'} ref={(input) => this.getPhone = input} /><br /><br />
                </label>
                <label>
                    СНИЛС<br/>
                    <input type={'text'} ref={(input) => this.getSnils = input} /><br /><br />
                </label>
                <label>
                    Пол<br/>
                    <select ref={(input) => this.getGender = input} name='gender'>
                        <option value={true}>Мужской</option>
                        <option value={false}>Женский</option>
                    </select><br/><br/>
                </label>
                <label>
                    Дата рождения<br/>
                    <input
                        ref={(input) => this.getBirthDate = input}
                        type="date" id="start" name="trip-start"/><br/><br/>
                </label>
                <label>
                    Адрес<br/>
                    <input type={'text'} ref={(input) => this.getAddress = input} /><br /><br />
                </label>
                <br/>
                <button onClick={this.sendData}>Отправить</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addPatient: (data) => dispatch(addPatient(data, () => {window.location.href = "/patients"})),
    };
};

export default connect(null, mapDispatchToProps)(PatientAddPage);