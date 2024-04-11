import { createBrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Books } from "./pages/books/Books";
import { Page } from "./pages/page/Page";

export const router = createBrowserRouter([
  {
    element: <Page />,
    path: "/",
  },
  {
    element: <Books />,
    path: "/books",
  },
  {
    element: <App />,
    path: "/books/:id/edit",
  },
  {
    element: <App />,
    path: "/reviews/:id/edit",
  },
]);
