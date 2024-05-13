import { useParams } from "react-router-dom";
import { useFetch } from "../../../utils/useFetch";

export const ViewBook = () => {
  const { id } = useParams();

  const { response, error } = useFetch(
    "get",
    "https://demo.api-platform.com/",
    `admin/books/${id}`
  );

  console.log(response);

  return (
    response && (
      <div>
        <p></p>
        <p></p>
        <p>{response.title}</p>
        <p>{response.rating}</p>
        <p>{response.author}</p>
      </div>
    )
  );
};
