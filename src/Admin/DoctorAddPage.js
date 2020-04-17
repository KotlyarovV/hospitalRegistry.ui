import React, {Component} from "react";
import {addDoctor} from "../Actions/AuthAction";
import {positions} from '../Positions'
import {connect} from "react-redux";

class DoctorAddPage extends Component{

    sendData = () => {
        const doctor = {
            firstName:this.getName.value,
            lastName:this.getLastName.value,
            middleName:this.getMiddleName.value,
            phone:this.getPhone.value,
            position:this.getPosition.value
        };

        this.props.addDoctor(doctor);
    };


    render() {

        const positionsSelector = (
            <select ref={(input) => this.getPosition = input} name='Position'>
                {positions.map(p => (<option value={p.name}>{p.name}</option>))}
            </select>);

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
                    Должность<br/>
                    {positionsSelector}
                </label>
                <br/><br/><br/>
                <button onClick={this.sendData}>Отправить</button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addDoctor: (data) => dispatch(addDoctor(data, () => {window.location.href = "/doctors"})),
    };
};

export default connect(null, mapDispatchToProps)(DoctorAddPage);