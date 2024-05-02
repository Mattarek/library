import { useParams } from "react-router-dom";
import { useFetch } from "../../../utils/useFetch";
import { useEffect, useState } from "react";

export const EditBook = () => {
  const [bookData, setBookData] = useState<number>();
  const { id } = useParams();
  const { response, error } = useFetch(
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
          <div>{bookData.title}</div>
        </>
      )}
    </div>
  );
};
