import React, {Component} from 'react';
import {connect} from 'react-redux'
import {auth} from '../Actions/AuthAction'

class Auth extends Component {
    constructor(props) {
        super(props);
    }

    auth = () => {
        const data = {
            login: this.getLogin.value,
            password: this.getPassword.value,
        };
        this.props.auth(data, () => {window.location.href = "/"});
        this.setState({ ...this.state, isSend: true });
      //  setTimeout(() => {window.location.href = "/";}, 1000);
    };

    render() {
        return (<div>
            <label>
                Логин
                <input type={'text'} ref={(input) => this.getLogin = input} /><br /><br />
            </label>
            <label>
                Пароль
                <input type={'text'} ref={(input) => this.getPassword = input} /><br /><br />
            </label>
            <button onClick={this.auth}>Войти</button>
        </div>);
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        auth: (data, changePage) => dispatch(auth(data, changePage)),
    };
};

export default connect(null, mapDispatchToProps)(Auth)