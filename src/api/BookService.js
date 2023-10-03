import axios from "axios";

const BASE_URL = "https://biblioteca-api-rho.vercel.app/book"

export class BookService{
    static getBooks(){
        return axios.get(`${BASE_URL}/get-books`);
    }

    static getBook(id){
        return axios.get(`${BASE_URL}/get-book/${id}`);
    }

    static createBook(body){
        return axios.post(`${BASE_URL}/create`,body);
    }

    static updateBook(id,body){
        return axios.put(`${BASE_URL}/edit/${id}`,body);
    }

    static deleteBook(id){
        return axios.delete(`${BASE_URL}/delete/${id}`);
    }
    
}

export default BookService