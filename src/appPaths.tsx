import { createBrowserRouter } from "react-router-dom";
import { Reviews } from "./pages/reviews/Reviews";
import { Books } from "./pages/books/Books";
import { EditReview } from "./pages/reviews/ID/EditReview";
import { EditBook } from "./pages/books/ID/EditBook";
import { ViewBook } from "./pages/books/ID/ViewBook";
import { ViewReview } from "./pages/reviews/ID/ViewReview";

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
    path: "/admin/books/:id/edit",
    element: <EditBook />,
  },
  {
    path: "/admin/books/:id/view",
    element: <ViewBook />,
  },
  {
    path: "/reviews",
    element: <Reviews />,
  },
  {
    path: "/admin/reviews/:id/edit",
    element: <EditReview />,
  },
  {
    path: "/admin/reviews/:id/view",
    element: <ViewReview />,
  },
]);
