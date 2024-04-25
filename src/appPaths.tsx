import { createBrowserRouter } from "react-router-dom";
import { Popular } from "./pages/popular/Popular";
import { Books } from "./pages/books/Books";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hi</div>,
  },
  {
    path: "/books",
    element: <Books />,
  },
  {
    path: "/popular",
    element: <Popular />,
  },
]);
