import {useEffect , useState} from 'react'
import Header from '../../components/Header/Header'
import "./index.scss"
import { useParams } from 'react-router-dom'
import { BookService } from '../../api/BookService'
import {Link} from "react-router-dom"
import Submenu from '../../components/Submenu/Submenu'

const BookEdit = () => {  
  let {bookId} = useParams();

  const [book, setBook] = useState([])

  async function getBook(){
    const {data} = await BookService.getBook(bookId);
    setBook(data.response);
  }

  async function editBook(){
    const body = {
        title: book.title,
        synopsis: book.synopsis,
        pages: Number(book.pages),
        isbn: book.isbn,
        publisher: book.publisher,
        img: book.img
      }
    // console.log(body);

    if(book.title!=undefined && book.title!='' && book.pages!=undefined && book.pages!='' && book.isbn !=undefined && book.isbn !='' && book.publisher !=undefined && book.publisher !=''){
      await BookService.updateBook(book._id,body)
      .then(({data})=>{
        alert(data.statusMensagem)
        getBook()
      })
      .catch(({response:{data,status}})=>{
        alert(`${status} - ${data}`)      
      });   
    }
  }

  useEffect(() => {
    getBook()    
  }, [])

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
            <button onClick={()=>{
              editBook()
            }}>Update Book</button>
            </div>                   
          </form>
          </div>        
    </div>
  </>)
  
}

export default BookEdit