import "./Header.css"
import logo from '../../images/fox-head 1.svg'
import { useLocation } from 'react-router-dom'


function Header (props) {
  const location = useLocation()
//later to change if credentials are present
  const locationChats = () => {
    return location.pathname ==="/chats"
  }

  const openSettings = () => {
    props.onOpenSettings(true)
  }

  return(
    <header>
      <div className="header-logo"><img alt="logo" src={logo}/></div>
      {locationChats() && <nav  className="header-nav">
        <ul className="header-nav-list">
          <li>Chats</li>
          <li onClick={openSettings}>Settings</li>
          <li className="header-logout">Logout</li>
        </ul>
      </nav>}
    </header>
  )
}

export default Header;