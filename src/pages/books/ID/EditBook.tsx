import { useParams } from "react-router-dom";

export const EditBook = () => {
  const asd = useParams();
  console.log(asd);
  return <div>hi {asd.id}</div>;
};
