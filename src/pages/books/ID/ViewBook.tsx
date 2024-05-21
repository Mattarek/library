import { useParams } from "react-router-dom";
import { useFetch } from "../../../utils/useFetch";

export const ViewBook = () => {
  const { id } = useParams();

  const { fetchedData, error } = useFetch(
    "get",
    "https://demo.api-platform.com/",
    `admin/books/${id}`
  );

  console.log(fetchedData);

  return (
    fetchedData && (
      <div>
        <p></p>
        <p></p>
        <p>{fetchedData?.data?.title}</p>
        <p>{fetchedData?.data?.rating}</p>
        <p>{fetchedData?.data?.author}</p>
      </div>
    )
  );
};
