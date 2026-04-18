import { Link } from "react-router-dom";
import '../css/Layout.css'
import appLogo from '../../assets/images/app_logo.svg'

const Sidebar = () => {
  return (
    <div>
      <div className="side-bar-logo">
        <img src={appLogo} alt="Application Logo"/>
        <h4>AI Application</h4>
      </div>
      <ul className="side-bar-elements">
        
        <li className="side-bar-active">
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/users">User Management</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;