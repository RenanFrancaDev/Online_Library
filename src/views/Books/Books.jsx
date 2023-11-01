import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import Submenu from "../../components/Submenu/Submenu";
import { BookService } from "../../api/BookService";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [bookTitle, setBookTItle] = useState()
  const [bookId, setBookId] = useState()

  const openModal = (id, title) => { 
    setIsOpenModal(true);
    setBookTItle(title) ;
    setBookId(id)
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  async function getBooks() {
    const { data } = await BookService.getBooks();
    const response = data.response;
    setBooks(response);
  }

  async function deleteBook(bookId, bookTitle) {
    console.log(bookId)
    let validate = confirm(`Do you really want to delete: ${bookTitle}`);
    if (validate) {
      await BookService.deleteBook(bookId)
        .then(({ data }) => {
          alert(data.statusMensagem);
          setIsOpenModal(false)
          getBooks();
        })
        .catch(({ response: { data, status } }) => {
          alert(`${status} - ${data.statusMensagem}`);
        });
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <Header />
      <Submenu />
      <div className="books">
        <h1>What book would you like to read today?</h1>
        <ul>
          {books.map((book) => (
            <li key={book._id}>
              <div className="img_container">
                <img src={book.img} alt="book cover" />
              </div>
              <div className="container_description">
                <h3>{book.title}</h3>
                <span>{book.publisher}</span>
                <div className="btn_container">
                  <Link className="btn edit" to={`book-edit/${book._id}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                    </svg>
                  </Link>

                  <Link
                    className="btn delete"
                    onClick={() => {
                      openModal(book._id, book.title);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {isOpenModal && (
            <div className="modal">
              <h1>Are you sure you want to delete {bookTitle}?</h1>
              <div className="modal_buttons">
                <button
                  onClick={() => {
                    deleteBook(bookId, bookTitle);
                  }}
                >
                  YES
                </button>
                <button
                  onClick={() => {
                    closeModal();
                  }}
                >
                  NO
                </button>
              </div>
            </div>
          )}
      </div>
    </>
  );
};

export default Books;
