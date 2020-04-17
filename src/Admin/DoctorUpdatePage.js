import React, {Component} from "react";
import {updateDoctor, getDoctor} from "../Actions/AuthAction";
import {connect} from "react-redux";
import {positions} from "../Positions";

class DoctorUpdatePage extends Component{
    componentDidMount() {
        let { id } = this.props.match.params;
        this.props.getDoctor(id);
        console.log(this.props.doctor)
    }

    sendData = () => {
        const doctor = {
            firstName:this.getName.value,
            lastName:this.getLastName.value,
            middleName:this.getMiddleName.value,
            phone:this.getPhone.value,
            position:this.getPosition.value
        };
        let { id } = this.props.match.params;

        this.props.updateDoctor(doctor, id);
    };

    getDefaultName() {
        if (this.props.doctor) {
            return this.props.doctor.firstName;
        }

        return '';
    }

    getDefaultLastName = () => {
        if (this.props.doctor) {
            return this.props.doctor.lastName;
        }

        return '';
    };

    getDefaultMiddleName() {
        if (this.props.doctor) {
            return this.props.doctor.middleName;
        }

        return '';
    }

    getDefaultPhone = () => {
        if (this.props.doctor) {
            return this.props.doctor.phone;
        }

        return '';
    }

    getDefaultPosition() {
        if (this.props.doctor) {
            return this.props.doctor.position;
        }

        return '';
    }

    render() {
        const positionsSelector = (
            <select ref={(input) => this.getPosition = input} name='Position' defaultValue={this.getDefaultPosition()}>
                {positions.map(p => (<option value={p.name}>{p.name}</option>))}
            </select>);

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
                    Должность<br/>
                    {positionsSelector}
                </label>
                <br/><br/><br/>
                <button onClick={this.sendData}>Отправить</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return  {
        doctor: state.doctors
    }
};

const mapDispatchToProps = (dispatch) => {

    return {
        getDoctor: (id) => dispatch(getDoctor(id)),
        updateDoctor: (data, id) => dispatch(updateDoctor(data, id, () => {window.location.href = "/doctors"})),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorUpdatePage);
