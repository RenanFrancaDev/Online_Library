import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.scss';
import Home from './views/Home/Home';
import Books from './views/Books/Books';
import BookEdit from './views/EditBook/BookEdit';
import BookRegister from './views/RegisterBook/BookRegister';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/books",
    element: <Books/>,
  },
  {
    path: "books/book-edit/:bookId",
    element: <BookEdit/>,
  },
  {
    path: "books/register",
    element: <BookRegister/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
