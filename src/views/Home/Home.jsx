import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./index.scss";
import { UserService } from "../../api/UserService"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  let [user, setUser] = useState([])

  const navigate = useNavigate();

  async function getLogin(){
    
    const body = {
      user: user.name,
      password: user.password
    }
    if(user.name && user.password){
      const {data} = await UserService.getUsers(user.name, user.pasword, body);
      const users = data.response;
      console.log(users)
      const userFound = users.filter((users) => users.name == user.name && users.password == user.password)
      console.log(userFound)
        if(userFound.length > 0){
        navigate("/books")
        }else{
        alert("Login ou senha incorretas");
        }
      }
    }

  return (
    <div className='home'>      
      <Header/>
      <h1>Fire Development Library</h1>
      <div>
        <form>
          <div className="form-group">
            <label htmlFor="user">User</label>
            <input type="text" required id="user" name="user" autoFocus onChange={(event)=>{ setUser({...user, name: event.target.value})}}></input>
            <label htmlFor="password">Password</label>
            <input type="password" required id="password" name="password" onChange={(event)=>{ setUser({...user, password: event.target.value})}}/>
            <Link><button onClick={()=>{getLogin()}}>Login</button></Link>
          </div>
        </form>v
      </div>
    </div>
  )
}

export default Home