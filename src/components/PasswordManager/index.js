import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import Passwords from '../Passwords'

import './index.css'

class PasswordManager extends Component {
  state = {
    websiteUrl: '',
    username: '',
    password: '',
    passwordManagerList: [],
    searchInput: '',
    isShow: false,
  }

  onWebsiteChange = event => {
    this.setState({websiteUrl: event.target.value})
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeShowPassword = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  onAddPasswords = event => {
    event.preventDefault()
    const {username, password, websiteUrl} = this.state

    const newPassword = {
      id: uuidv4(),
      webiste: websiteUrl,
      user: username,
      pass: password,
    }

    this.setState(prevState => ({
      passwordManagerList: [...prevState.passwordManagerList, newPassword],
      websiteUrl: '',
      username: '',
      password: '',
    }))
  }

  onDeletePassword = id => {
    const {passwordManagerList} = this.state
    const newList = passwordManagerList.filter(
      eachPassword => eachPassword.id !== id,
    )
    this.setState({passwordManagerList: newList})
  }

  renderNoPasswordImage = () => {
    const {passwordManagerList} = this.state
    return (
      <div className="no-pass-img-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          className="no-password-img"
          alt="no passwords"
        />
        <p className="no-password-text">No Passwords</p>
      </div>
    )
  }

  renderPasswordManagerlist = () => {
    const {passwordManagerList, searchInput, isShow} = this.state

    const searchResults = passwordManagerList.filter(eachPassword =>
      eachPassword.webiste
        .toLowerCase()
        .includes(searchInput.toLocaleLowerCase()),
    )

    return (
      <ul className="unorder-pass-list-container">
        {searchResults.map(eachPassword => (
          <Passwords
            eachPasswordDetails={eachPassword}
            key={eachPassword.id}
            onDeletePassword={this.onDeletePassword}
            isShow={isShow}
            id={eachPassword.id}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {passwordManagerList, searchInput, username, password, websiteUrl} =
      this.state

    const searchResults = passwordManagerList.filter(eachPassword =>
      eachPassword.webiste
        .toLowerCase()
        .includes(searchInput.toLocaleLowerCase()),
    )

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />

        <div className="form-img-container">
          <form className="form-container" onSubmit={this.onAddPasswords}>
            <h1 className="add-pass-text">Add New Password</h1>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-logos-img"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input-box"
                onChange={this.onWebsiteChange}
                value={websiteUrl}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-logos-img"
              />
              <input
                type="text"
                className="input-box"
                placeholder="Enter Username"
                onChange={this.onUsernameChange}
                value={username}
              />
            </div>
            <div className="input-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-logos-img"
              />
              <input
                type="password"
                className="input-box"
                placeholder="Enter Password"
                onChange={this.onPasswordChange}
                value={password}
              />
            </div>
            <button type="submit" className="add-btn">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-manager-img"
          />
        </div>

        <div className="password-manager-container">
          <div className="pass-head-search-container">
            <div className="yourPassword-head-pass-count-container">
              <h1 className="your-pass-head">Your Passwords </h1>
              <p className="pass-count">{passwordManagerList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo-img"
              />
              <input
                type="search"
                className="search-box"
                placeholder="Search"
                onChange={this.onChangeSearchInput}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="horizon-line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              id="show-pass"
              onChange={this.onChangeShowPassword}
            />
            <label htmlFor="show-pass" className="label-text">
              Show Passwords
            </label>
          </div>
          {searchResults.length === 0
            ? this.renderNoPasswordImage()
            : this.renderPasswordManagerlist()}
        </div>
      </div>
    )
  }
}

export default PasswordManager
