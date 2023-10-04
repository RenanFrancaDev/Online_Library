import axios from "axios";

const BASE_URL = "https://biblioteca-api-rho.vercel.app/user"

export class UserService{
    static getUsers(){
        return axios.get(`${BASE_URL}/get-users`);
    }

    static getUser(name, password){
        return axios.get(`${BASE_URL}/get-user/${name, password}`);
    }

    static createUser(body){
        return axios.post(`${BASE_URL}/create`,body);
    }

    static updateBook(id,body){
        return axios.put(`${BASE_URL}/edit/${id}`,body);
    }

    static deleteBook(id){
        return axios.delete(`${BASE_URL}/delete/${id}`);
    }
    
}

export default UserService