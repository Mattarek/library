import axios from "axios";

export const getBooks = async (
  baseUrl: string,
  endpoint: string,
  fieldName: string | null = null,
  queryParams: string | string[] = ""
) => {
  try {
    let url = `${baseUrl}${endpoint}`;

    if (Array.isArray(queryParams)) queryParams = queryParams.join("&");
    if (queryParams)
      url += url.includes("?") ? `&${queryParams}` : `?${queryParams}`;

    const response = await axios.get(url);
    if (!response.data) throw new Error("No data returned in the response");

    return fieldName ? response.data[fieldName] : response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
