import React, {Component} from "react";
import {addAppointInterval} from "../Actions/AuthAction";
import {connect} from "react-redux";

class AddAppointmentInterval extends Component{

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

        this.props.addAppointInterval(appointInterval);
    };

    render() {
        return (
          <div align={'center'}>
              <label>
                  Дата приема<br/>
                  <input
                      ref={(input) => this.getDate = input}
                      type="date" id="start" name="trip-start"/><br/><br/>
              </label>
              <label>
                  Начало приема<br/>
                  <input type="time" ref={(input) => this.getStartTime = input}/>
              </label><br/><br/>
              <label>
                  Конец приема<br/>
                  <input type="time" ref={(input) => this.getEndTime = input}/>
              </label><br/><br/>
              <label>
                  Кабинет<br/>
                  <input type={'text'} ref={(input) => this.getLocation = input} /><br /><br />
              </label>
              <button onClick={this.sendData}>Сохранить</button>
          </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addAppointInterval: (data) => dispatch(addAppointInterval(data, () => {window.location.href = "/appointmentIntervals"})),
    };
};

export default connect(null, mapDispatchToProps)(AddAppointmentInterval);