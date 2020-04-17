import React, {Component} from "react";

export class AdminMainPage extends Component{


    render() {
        return (
            <div>
                <h4>Кабинет администратора</h4>
                <br/>
                <button onClick={() => {window.location.href = "/doctors"}} >Добавить врача</button><br/><br/>
                <button onClick={() => {window.location.href = "/patients"}} >Добавить пациента</button><br/>
                <br/>
            </div>
        )
    }
}