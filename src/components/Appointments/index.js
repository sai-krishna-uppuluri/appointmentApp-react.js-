// Write your code here

import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'

class Appointments extends Component {
  state = {
    textInput: '',
    dateInput: '',
    appointment: [],
  }

  onChangeTextInput = event => {
    this.setState({
      textInput: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {textInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: textInput,
      date: formattedDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointment: [...prevState.appointment, newAppointment],
      title: '',
      date: '',
    }))
  }

  render() {
    const {textInput, dateInput} = this.state

    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="appointment-input-container">
            <div className="input-container">
              <h1 className="main-heading">Add Appointment </h1>
              <form className="form">
                <p className="input-description"> Title </p>
                <input
                  type="text"
                  className="text-input"
                  placeholder="Title"
                  value={textInput}
                  onChange={this.onChangeTextInput}
                />
                <p className="input-description"> Date </p>
                <input
                  type="date"
                  className="date-input"
                  placeholder="dd/mm/yyyy"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                />
                <button
                  className="submit-button"
                  type="button"
                  onSubmit={this.onSubmitForm}
                >
                  Add
                </button>
              </form>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="image"
              />
            </div>
          </div>
          <hr className="line" />
          <div className="appointment-list-container">
            <div className="appointment-header">
              <p className="appointment-heading"> Appointments </p>
              <button className="starred-button" type="button">
                Starred
              </button>
            </div>
            <ul className="appointment-list">
              <li className="appointment-list-items">
                {this.getAppointmentList()}
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
