import { useState } from "react";
import { useParams } from "react-router-dom";
("");
export const EditReview = () => {
  const { id } = useParams();
  return <div>hi {id}</div>;
};
