import {useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import BookService from '../../api/BookService'
import Submenu from '../../components/Submenu/Submenu'
import { Link, useNavigate } from 'react-router-dom'

const BookRegister = () => {
  
  const [book, setBook] = useState([])
  const navigate = useNavigate()

  async function createBook(){
    const body = {
            title: book.title,
            synopsis: book.synopsis,
            pages: Number(book.pages),
            isbn: book.isbn,
            publisher: book.publisher,
            img: book.img
      }

    if(book.title!=undefined && book.title!='' && book.pages!=undefined && book.pages!='' && book.isbn !=undefined && book.isbn !='' && book.publisher !=undefined && book.publisher !=''){
      const {data} = await BookService.createBook(body)
        alert(data.statusMensagem);
    }
    navigate("/books")
  }

  return (
  <>
    <Header/>    
    <Submenu/>
    <div className='container_register'>
        <h1>Book Edit</h1>
        <div>
          <form>
            <div className='form-group'>
              <label>Title*</label>
              <input type="text" required onChange={(event)=>{ setBook({...book, title: event.target.value})}} value={book.title || ''} ></input>
            </div>
            <div className='form-group'>
              <label>Synopsis</label>
              <input type="text" onChange={(event)=>{ setBook({...book, synopsis: event.target.value})}} value={book.synopsis || ''} ></input>
            </div>
            <div className='form-group'>
              <label>Number pages*</label>
              <input type="text"  required onChange={(event)=>{ setBook({...book, pages: event.target.value})}} value={book.pages || ''}></input>
            </div>
            <div className='form-group'>
              <label>ISBN*</label>
              <input type="text"  required onChange={(event)=>{ setBook({...book, isbn: event.target.value})}} value={book.isbn || ''}></input>
            </div>
            <div className='form-group'>
              <label>Publisher*</label>
              <input type="text"  required onChange={(event)=>{ setBook({...book, publisher: event.target.value})}} value={book.publisher || ''}></input>
            </div>
            <div className='form-group'>
              <label>Image</label>
              <input type="text"  onChange={(event)=>{ setBook({...book, img: event.target.value})}} value={book.img     || ''}></input>
            </div>  
          <div className='form-group'>

            <Link to="/books">
          <button onClick={()=>{
              createBook()
            }}>Update Book</button></Link>
          </div>         
          </form>
        </div>
    </div>
  </>)
  
}

export default BookRegister