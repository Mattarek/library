import { useParams } from "react-router-dom";
import { useFetch } from "../../../utils/useFetch";
import { Rating } from "@mui/material";

export const ViewReview = () => {
  const { id } = useParams();
  const { response, error } = useFetch(
    "get",
    "https://demo.api-platform.com/",
    `admin/reviews/${id}`
  );

  if (error) return error;
  return (
    response && (
      <div>
        <div>Author: {response.user.name}</div>
        <div>Book: {response.book.title}</div>
        <div>
          Published at:{" "}
          {response.publishedAt.slice(0, 10).split("-").reverse().join(".")}
        </div>
        <div>
          Rating: <Rating value={response.rating} readOnly /> {}
        </div>
        <div>Body: {response.body}</div>
      </div>
    )
  );
};
