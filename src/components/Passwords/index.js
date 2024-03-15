import './index.css'

const Passwords = props => {
  const {eachPasswordDetails, onDeletePassword, isShow} = props
  const {webiste, user, id, pass} = eachPasswordDetails

  const initialBackgroundColors = [
    'green',
    'yellow',
    'orange',
    'lightGreen',
    'red',
    'blue',
  ]

  const initial =
    initialBackgroundColors[
      Math.floor(Math.random() * initialBackgroundColors.length - 1)
    ]

  const starsElement = (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars-img"
    />
  )

  const passwordElement = <p className="text">{pass}</p>

  const showHidePass = isShow ? passwordElement : starsElement

  const onDelete = () => {
    onDeletePassword(id)
  }

  return (
    <li className="pass-list-item">
      <div className="user-details-container">
        <p className={`userInitial ${initial}`}>{user[0]}</p>
        <div className="userDetails">
          <p className="text">{webiste}</p>
          <p className="text">{user}</p>
          {showHidePass}
        </div>
      </div>
      <button
        className="delete-btn"
        type="button"
        data-testid="delete"
        onClick={onDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default Passwords
