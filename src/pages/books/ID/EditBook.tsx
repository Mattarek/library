import { useParams } from "react-router-dom";
import { useFetch } from "../../../utils/useFetch";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { DataBooks } from "../../../types/types";
import { Modal } from "../../../components/Modal/Modal";

export const EditBook = () => {
  const [bookData, setBookData] = useState<DataBooks | null>(null);
  const [isModalShown, setIsModalShown] = useState(false);

  const { id } = useParams();
  const handleOpen = () => setIsModalShown(true);

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

  if (error) return <div>Something went wrong!</div>;
  return (
    <>
      {bookData && (
        <>
          <div>{bookData.title}</div>
          <div>{bookData.by_statement}</div>
          <div>{bookData.publish_date}</div>
          <div>{bookData.publish_places[0]}</div>
          <div>{bookData.number_of_pages}</div>

          <Button onClick={handleOpen}>Delete</Button>
          <Modal state={isModalShown} setOpen={setIsModalShown} />
        </>
      )}
    </>
  );
};
