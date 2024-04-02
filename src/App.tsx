import { useEffect, useState } from "react";
import "./App.css";
import axios, { AxiosResponse } from "axios";
import { DataGridDemo } from "./components/DataGrid/DataGrid";

interface Book {
  "@context": string;
  "@id": string;
  "@type": string;
  book: string;
  title: string;
  author: string;
  condition: string;
  reviews: string;
  rating: number;
}

function App() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const getData = async () => {
      axios
        .get("https://demo.api-platform.com/books")
        .then(
          (response: AxiosResponse<{ "hydra:member": Book[] }>): Book[] =>
            response.data["hydra:member"]
        )
        .then(setBooks)
        .catch(setError);
    };
    getData();
  }, []);

  if (error) return <>{error}</>;
  return (
    <>
      {books?.map((book) => {
        return (
          <>
            <div key={book["@id"]}>{book.author}</div>
            <div>{book.book}</div>
            <div>{book.reviews}</div>
          </>
        );
      })}
      <br />
    </>
  );
}

export default App;
