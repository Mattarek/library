import { useParams } from "react-router-dom";
import { useFetch } from "../../../utils/useFetch";

export const ViewReview = () => {
  const { id } = useParams();

  return <div>hi {id}</div>;
};
