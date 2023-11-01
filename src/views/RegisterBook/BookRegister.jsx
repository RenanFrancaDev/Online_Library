import { useState } from "react";
import Header from "../../components/Header/Header";
import "./index.scss";
import BookService from "../../api/BookService";
import Submenu from "../../components/Submenu/Submenu";
import { useNavigate } from "react-router-dom";
// import ModalAdd from "../../components/ModalAdd/Modal";

const BookRegister = () => {
  const [book, setBook] = useState([]);
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  async function createBook() {
    const body = {
      title: book.title,synopsis: book.synopsis,
      pages: Number(book.pages),isbn: book.isbn,
      publisher: book.publisher, img: book.img,
    };

    if (
      book.title != undefined &&
      book.title != "" &&
      book.pages != undefined &&
      book.pages != "" &&
      book.isbn != undefined &&
      book.isbn != "" &&
      book.publisher != undefined &&
      book.publisher != ""
    ) {
      const { data } = await BookService.createBook(body);
      alert(data.statusMensagem);
      if (data.statusMensagem) navigate("/books");
    }
  }

  return (
    <>
      <Header />
      <Submenu />
      <div className="container_register">
        <h1>Register Book</h1>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="form-group">
              <label>Title*</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setBook({ ...book, title: event.target.value });
                }}
                value={book.title || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Synopsis</label>
              <input
                type="text"
                onChange={(event) => {
                  setBook({ ...book, synopsis: event.target.value });
                }}
                value={book.synopsis || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Number pages*</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setBook({ ...book, pages: event.target.value });
                }}
                value={book.pages || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>ISBN*</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setBook({ ...book, isbn: event.target.value });
                }}
                value={book.isbn || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Publisher*</label>
              <input
                type="text"
                required
                onChange={(event) => {
                  setBook({ ...book, publisher: event.target.value });
                }}
                value={book.publisher || ""}
              ></input>
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="text"
                onChange={(event) => {
                  setBook({ ...book, img: event.target.value });
                }}
                value={book.img || ""}
              ></input>
            </div>
            <div className="form-group">
              <button
                onClick={() => {
                  openModal();
                }}
              >
                Update Book
              </button>
            </div>
          </form>
        </div>

        {/* <ModalAdd
        isOpen={isOpenModal}
        onclose={closeModal}
        createBook={createBook}
        book={book}
        /> */}

        {isOpenModal && (
          <div className="modal">
            <h1>Are you sure you want to register {book.title}?</h1>
            <div className="modal_buttons">
              <button
                onClick={() => {
                  createBook();
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

export default BookRegister;