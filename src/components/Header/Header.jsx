
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.svg";
import "./index.scss";

function Header() {
  return (
    <div className='header'>
        <Link to="/"><img src={logo}/></Link>
        <ul>
            <li>Books</li>
        </ul>        
    </div>
  )
}

export default Header
