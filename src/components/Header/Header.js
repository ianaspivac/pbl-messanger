import "./Header.css"
import logo from '../../images/fox-head 1.svg'
import {useHistory, useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";


function Header(props) {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
//later to change if credentials are present
  const locationChats = () => {
    return location.pathname === "/chats"
  }

  const logout = () => {
    localStorage.clear();
    dispatch({ type: "LOGOUT" });
    history.replace("/login");
  }

  const openSettings = () => {
    props.onOpenSettings(true)
  }

  return (
    <header>
      <div className="header-logo"><img alt="logo" src={logo}/></div>
      {locationChats() && <nav className="header-nav">
        <ul className="header-nav-list">
          <li>Chats</li>
          <li onClick={openSettings}>Settings</li>
          <li className="header-logout" onClick={logout}>Logout</li>
        </ul>
      </nav>}
    </header>
  )
}

export default Header;