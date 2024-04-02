import axios, { AxiosResponse } from "axios";

export const getData = async (link: string, parameter: string) => {
  axios
    .get(link)
    .then(
      (response: AxiosResponse<{ parameter: Book[] }>): Book[] =>
        response.data[parameter]
    )
    .then(setBooks)
    .catch(setError);
};
