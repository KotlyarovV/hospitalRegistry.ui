import React, {Component} from "react";

export class DoctorMainPage extends Component{


    render() {
        return (
            <div>
                <h4>Кабинет врача</h4>
                <br/>
                <button onClick={() => {window.location.href = "/appointmentIntervals"}} >Добавить информацию о приеме</button><br/><br/>
                <button onClick={() => {window.location.href = "/appointmentDoctor"}} >Заполнить талон</button><br/>
                <br/>
            </div>
        )
    }
}