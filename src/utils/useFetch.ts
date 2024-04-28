import { useState, useContext, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";
import { Response } from "../types/types";

export const useFetch = (baseUrl: string, params: string) => {
  const { token } = useContext<IAuthContext>(AuthContext);
  const [response, setResponse] = useState<Response>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const firstPageResponse = await axios.get(`${baseUrl}${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (firstPageResponse.status === 200) setResponse(firstPageResponse.data);
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [baseUrl, params]);

  return { response, isLoading, error };
};
