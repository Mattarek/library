import { useState, useContext, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";
import { Response, BaseEntity } from "../types/types";

type AxiosMethod = "get" | "post" | "put" | "delete";

export const useFetch = <T extends BaseEntity>(
  method: AxiosMethod,
  baseUrl: string,
  params?: string
) => {
  const { token } = useContext<IAuthContext>(AuthContext);
  const [response, setResponse] = useState<Response<T> | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const dataResponse = await axios[method](`${baseUrl}${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(dataResponse)
      setResponse(dataResponse.data)
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

  return { response, isLoading, error };
};
