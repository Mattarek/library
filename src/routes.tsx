import { createBrowserRouter } from "react-router-dom";
import BooksPage from "./pages/books/Books";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hi</div>,
  },
  {
    path: "/books",
    element: <BooksPage />,
  },
]);
