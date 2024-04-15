import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

const useApiAllPages = (baseUrl: string) => {
  const [allPagesData, setAllPagesData] = useState<[] | string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const currentPageUrl = baseUrl;
        let totalPages = 1;

        const firstPageResponse = await axios.get(currentPageUrl);
        const firstPageData = firstPageResponse.data;
        if (!firstPageData) return;

        const { "hydra:view": view } = firstPageData;
        if (view["hydra:last"]) {
          const lastPageUrl = view["hydra:last"];
          totalPages = parseInt(lastPageUrl.split("=")[1]);
        }

        const allPagesData = [];
        for (let i = 1; i <= totalPages; i++) {
          const pageUrl = `${baseUrl}?page=${i}`;
          const pageResponse = await axios.get(pageUrl);
          const pageData = pageResponse.data;
          if (pageData["hydra:member"]) {
            allPagesData.push(pageData);
          }
        }

        setAllPagesData(allPagesData);
      } catch (error) {
        const err = error as AxiosError;
        console.log(err.response?.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [baseUrl]);

  return { allPagesData, isLoading, error };
};

export default useApiAllPages;
