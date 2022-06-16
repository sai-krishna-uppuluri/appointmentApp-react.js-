// Write your code here

import {Component} from 'react'

import {v4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem/index'
import './index.css'

class Appointments extends Component {
  state = {
    textInput: '',
    dateInput: '',
    appointment: [],
    isFilterActive: false,
  }

  toggleStarImage = id => {
    this.setState(prevState => ({
      appointment: prevState.appointment.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  onFilter = () => {
    const {isFilterActive} = this.state

    this.setState({
      isFilterActive: !isFilterActive,
    })
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
      textInput: '',
      dateInput: '',
    }))
  }

  getFilteredAppointment = () => {
    const {appointment, isFilterActive} = this.state

    if (isFilterActive) {
      return appointment.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointment
  }

  render() {
    const {textInput, dateInput, isFilterActive} = this.state

    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'

    const filteredAppointmentsList = this.getFilteredAppointment()

    return (
      <div className="app-container">
        <div className="appointment-container">
          <div className="appointment-input-container">
            <div className="input-container">
              <h1 className="main-heading">Add Appointment </h1>
              <form className="form" onSubmit={this.onSubmitForm}>
                <label htmlFor="input" className="input-description">
                  Title
                </label>
                <input
                  type="text"
                  id="input"
                  className="text-input"
                  placeholder="Title"
                  value={textInput}
                  onChange={this.onChangeTextInput}
                />
                <label htmlFor="date" className="input-description">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="date-input"
                  placeholder="dd/mm/yyyy"
                  value={dateInput}
                  onChange={this.onChangeDateInput}
                />
                <button className="submit-button" type="submit">
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
              <h1 className="appointment-heading"> Appointments </h1>
              <button
                className={`starred-button ${filterClassName}`}
                type="button"
                onClick={this.onFilter}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  eachAppointment={eachAppointment}
                  key={eachAppointment.id}
                  toggleStarImage={this.toggleStarImage}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
