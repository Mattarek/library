import { Box, Rating, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../../../utils/useFetch'
import { Review } from '../../../types/types'

export const EditReview = () => {
  const [reviewData, setReviewData] = useState({
    book: {
      author: '',
      title: ''
    },
    body: '',
    rating: 0
  })

  const params = useParams()

  const { data, error } =
    useFetch < Review > ('get', 'https://demo.api-platform.com/', `admin/reviews/${params.id}`)

  useEffect(() => {
    if (!data) return
    setReviewData(data)
  }, [data])

  if (error) return <p>An error occurred while fetching data from the api.</p>
  return (
    reviewData && (
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {
            m: 1,
            width: '500px'
          }
        }}
      >
        <div style={{ padding: '8px' }}>
          <TextField
            id="outlined-select-currency"
            label="Book"
            variant="standard"
            value={`${reviewData.body} - ${reviewData.book.title}`}
            sx={{ width: '250px' }}
          ></TextField>
          <br />
          <TextField
            id="standard-select-currency-native"
            label="Body"
            variant="standard"
            sx={{
              width: 150
            }}
            value={reviewData.body}
          />
          <br />
          <Rating
            name="simple-controlled"
            value={reviewData.rating}
            onChange={(_, newValue) => {
              if (newValue) {
                setReviewData(prev => ({
                  ...prev,
                  rating: newValue
                }))
              }
            }}
          />
        </div>
      </Box>
    )
  )
}
