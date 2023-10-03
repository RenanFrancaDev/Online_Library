
import { Link } from 'react-router-dom';
import "./index.scss";

function Submenu() {
  return (
    <div className='submenu'>        
        <ul>
            <li><Link to="/books/register">Book Add</Link></li>
        </ul>        
    </div>
  )
}

export default Submenu
