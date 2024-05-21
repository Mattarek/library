import { useParams } from "react-router-dom";
import { useFetch } from "../../../utils/useFetch";
import { Rating } from "@mui/material";
import { useEffect, useState } from "react";

export const ViewReview = () => {
  const { id } = useParams();
  const [data, setData] = useState()
  
  const { fetchedData, error } = useFetch(
    "get",
    "https://demo.api-platform.com/",
    `admin/reviews/${id}`
  );

  useEffect(() => {
    setData(fetchedData?.data)
    console.log(data)
  }, [fetchedData])
  
  

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
