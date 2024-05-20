import { useParams } from "react-router-dom";
import { useFetch } from "../../../utils/useFetch";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";

export const ViewReview = () => {
  const { id } = useParams();
  const [data, setData] = useState()
  
  const { response, error } = useFetch(
    "get",
    "https://demo.api-platform.com/",
    `admin/reviews/${id}`
  );

  useEffect(() => {
    setData(response)
    console.log(data)
  }, [response])
  
  

  return (
    data && (
      <div>
        <div>Author: {data.user.name}</div>
        <div>Book: {data.book.title}</div>
        <div>
          {`Published at: ${data.publishedAt.slice(0, 10).split("-").reverse().join(".")}`}
        </div>
        <div>
          Rating: <Rating value={data.rating} readOnly /> {}
        </div>
        <div>Body: {data.body}</div>
      </div>
    )
  );
};
