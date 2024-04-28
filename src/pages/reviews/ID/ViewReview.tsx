import { useParams } from "react-router-dom";
export const ViewReview = () => {
  const { id } = useParams();
  return <div>hi {id}</div>;
};
