import { useState, useContext, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";
import { AxiosMethod, Book, Response } from "../types/types";

export const useFetch = <T>(
  method: AxiosMethod,
  baseUrl: string,
  params?: string,
  parameters?: { mock?: string }
) => {
  const { token } = useContext<IAuthContext>(AuthContext);
  const [fetchedData, setFetchedData] = useState<AxiosResponse<T>>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AxiosError| null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dataResponse = await axios[method](`${baseUrl}${params}`, {
        ...parameters,
        headers: { Authorization: `Bearer ${token}` },
      });

      setFetchedData(dataResponse);
    } catch (error) {
      const err = error as AxiosError;
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [method, baseUrl, params]);

  return { fetchedData, isLoading, error };
};