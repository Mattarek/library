import { createBrowserRouter } from "react-router-dom";
import { Books } from "./pages/books/Books";
import { Page } from "./pages/page/Page";

export const router = createBrowserRouter([
  {
    element: <Books />,
    path: "/",
  },
  {
    element: <Books />,
    path: "/books",
  },
]);
