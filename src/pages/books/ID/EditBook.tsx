import { useParams } from "react-router-dom";
import { useFetch } from "../../../utils/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "../../../components/Modal/Modal";

export const EditBook = () => {
  const [bookData, setBookData] = useState<number>();
  const [isModalShown, setIsModalShown] = useState<boolean>(true);
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

  const handleClickDelete = async (id: string) => {
    console.log(id);
    () => setIsModalShown(true);
    try {
      const response = await axios.delete(
        `https://demo.api-platform.com/admin/books/${id}`
      );
      console.log("Delete successful:", response.data);
    } catch (error) {
      console.error("Error while deleting:", error);
    }
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
          {isModalShown && <Modal onClose={() => setIsModalShown(false)} />}
        </>
      )}
    </div>
  );
};
