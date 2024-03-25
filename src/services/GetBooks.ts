import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface Book {
  id: number;
  title: string;
  author: string;
  book: string;
  condition: string;
  reviews: string;
  rating: number;
}

interface ErrorState {
  message: string;
  status?: number;
}

const useFetchBooks = (url: string) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorState | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response: AxiosResponse<Book[]> = await axios.get(url);
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);

        setLoading(false);
      }
    };

    fetchBooks();
  }, [url]);

  return { books, loading, error };
};

export default useFetchBooks;
