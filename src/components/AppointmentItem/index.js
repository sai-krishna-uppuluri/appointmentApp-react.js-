import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, toggleStarImage} = props
  const {id, title, date, isStarred} = eachAppointment

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarButton = () => {
    toggleStarImage(id)
  }

  return (
    <li className="appointment-container">
      <div className="header-in-container">
        <p className="title"> {title} </p>
        <button
          className="button"
          type="button"
          onClick={onClickStarButton}
          testid="star"
        >
          <img src={starImageUrl} alt="star" className="star-image" />
        </button>
      </div>
      <p className="date-text"> {date} </p>
    </li>
  )
}

export default AppointmentItem
