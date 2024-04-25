import { useState, useEffect, useContext } from "react";
import axios, { AxiosError } from "axios";
import { AuthContext, IAuthContext } from "react-oauth2-code-pkce";

export const useApiAllPages = (baseUrl: string) => {
  const [data, setData] = useState<[] | string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext<IAuthContext>(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const firstPageResponse = await axios.get(baseUrl, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (firstPageResponse.status === 200) {
          setData(firstPageResponse.data);
        }
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  return { data, isLoading, error };
};

export default useApiAllPages;
