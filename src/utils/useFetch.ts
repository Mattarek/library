import { useState, useContext, useEffect } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";
import { Response, BaseEntity } from "../types/types";

type AxiosMethod = "get" | "post" | "put" | "delete";

export const useFetch = <T extends BaseEntity>(
  method: AxiosMethod,
  baseUrl: string,
  params?: string,
  parameters?: {mock: string}
) => {
  const { token } = useContext<IAuthContext>(AuthContext);
  const [fetchedData, setFetchedData] = useState<Response<T> | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const dataResponse:AxiosResponse<T> = await axios[method](`${baseUrl}${params}`, {
        ...parameters,
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('dataResponse: ', dataResponse)
      setFetchedData(dataResponse)
    } catch (error) {
      const err = error as AxiosError;
      setError(err)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [method, baseUrl, params]);

  return { fetchedData, isLoading, error };
};
