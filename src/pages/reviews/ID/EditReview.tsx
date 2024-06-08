import {Box, Card, CardContent, Rating, TextField} from '@mui/material'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useFetch} from '../../../utils/useFetch'
import {Review} from '../../../types/types'

export const EditReview = () => {
  const [reviewData, setReviewData] = useState<Review>({
    book: {
      author: '',
      title: ''
    },
    body: '',
    rating: 0,
    publishedAt: '',
    user: {
      name: ''
    }
  })

  const params = useParams()

  const {data, error} = useFetch<Review>(
    'get',
    'https://demo.api-platform.com/',
    `admin/reviews/${params.id}`
  )

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
        <Card raised>
          <CardContent>
            <TextField
              label="Book"
              variant="standard"
              value={`${reviewData.book.title} - ${reviewData.book.author}`}
              sx={{width: '250px'}}
            ></TextField>
            <br />
            <TextField
              label="Body"
              multiline
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
          </CardContent>
        </Card>
      </Box>
    )
  )
}
