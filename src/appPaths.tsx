import { createBrowserRouter } from "react-router-dom";
import { Reviews } from "./pages/reviews/Reviews";
import { Books } from "./pages/books/Books";
import { EditReview } from "./pages/reviews/ID/EditReview";
import { EditBook } from "./pages/books/ID/EditBook";
import { ViewBook } from "./pages/books/ID/ViewBook";
import { ViewReview } from "./pages/reviews/ID/ViewReview";
import { LibraryLayout } from "./layout/library";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LibraryLayout />,
    children: [
      {
        index: true,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/books/:id/edit",
        element: <EditBook />,
      },
      {
        path: "/books/:id/view",
        element: <ViewBook />,
      },
      {
        path: "/reviews",
        element: <Reviews />,
      },
      {
        path: "/reviews/:id/edit",
        element: <EditReview />,
      },
      {
        path: "/reviews/:id/view",
        element: <ViewReview />,
      },
    ],
  },
]);
