import { Box, Rating, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../../utils/useFetch";

export const EditReview = () => {
  const [reviewData, setReviewData] = useState(null);

  const { id } = useParams();

  const { fetchedData, error } = useFetch(
    "get",
    "https://demo.api-platform.com/",
    `admin/reviews/${id}`
  );

  useEffect(() => {
    if (fetchedData) {
      console.log(reviewData)
      setReviewData(fetchedData?.data);
    }
  }, [fetchedData]);

  if (error) return <p>An error occurred while downloading from the api.</p>;

  return (
    reviewData && (
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": {
            m: 1,
            width: "500px",
          },
        }}
      >
        <div style={{ padding: "8px" }}>
          <TextField
            id="outlined-select-currency"
            label="Book"
            variant="standard"
            defaultValue={`${reviewData.book.author} - ${reviewData.book.title}`}
            sx={{ width: "250px" }}
          ></TextField>
          <br />
          <TextField
            id="standard-select-currency-native"
            label="Body"
            variant="standard"
            sx={{
              width: 150,
            }}
            defaultValue={reviewData.body}
          />
          <br />
          <Rating
            name="simple-controlled"
            value={reviewData.rating}
            onChange={(event, newValue) => {
              setReviewData((prev) => ({
                ...prev,
                rating: newValue,
              }));
            }}
          />
        </div>
      </Box>
    )
  );
};
