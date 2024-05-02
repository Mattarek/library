import { useParams } from "react-router-dom";
import { useFetch } from "../../../utils/useFetch";
import { useEffect, useState } from "react";

export const EditBook = () => {
  const [bookData, setBookData] = useState<number>();
  const { id } = useParams();
  const { response, error } = useFetch(
    "get",
    "https://demo.api-platform.com/",
    `admin/books/${id}`
  );

  useEffect(() => {
    if (response && "book" in response) {
      const { book } = response;

      fetch(book)
        .then((response) => response.json())
        .then((data) => {
          setBookData(data);
        })
        .catch((error) => {
          console.error("Błąd podczas pobierania danych z linku: ", error);
        });
    }
  }, [response]);

  const handleClickDelete = (id) => {
    console.log(id);
  };
  console.log(bookData);
  if (error) return <div>Something went wrong!</div>;
  return (
    <div>
      {bookData && (
        <>
          <div>{bookData.title}</div>
          <div>{bookData.by_statement}</div>
          <div>{bookData.publish_date}</div>
          <div>{bookData.publish_places[0]}</div>
          <div>{bookData.number_of_pages}</div>
          <button onClick={() => handleClickDelete(id)}>Delete</button>
        </>
      )}
    </div>
  );
};
