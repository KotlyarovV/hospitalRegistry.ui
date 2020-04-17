import React, {Component} from "react";

export default class PatientsMainPage extends Component{

    render() {
        return (
            <div>
                <h4>Кабинет пациента</h4>
                <br/>
                <button onClick={() => {window.location.href = "/addAppointment"}} >Записаться на прием</button><br/><br/>
                <button onClick={() => {window.location.href = "/appointments"}} >Просмотреть свои приемы</button><br/>
                <br/>
            </div>
        )
    }
}