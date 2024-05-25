import {Link, useParams} from 'react-router-dom'
import {useFetch} from '../../../utils/useFetch'
import {Card, CardContent, Rating, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {Review} from '../../../types/types'

export const ViewReview = () => {
  const {id} = useParams()
  const [dataReview, setDataReview] = useState<Review>({
    rating: 0,
    book: {author: '', title: ''},
    body: '',
    user: {
      name: ''
    },
    publishedAt: ''
  })

  const {data} = useFetch<Review>('get', 'https://demo.api-platform.com/', `admin/reviews/${id}`)

  console.log(data)
  useEffect(() => {
    if (!data) return
    setDataReview(data)
  }, [data])

  return (
    data && (
      <Card raised>
        <CardContent>
          <Typography paragraph gutterBottom>
            Author: {dataReview?.user.name}
          </Typography>
          <Typography paragraph gutterBottom>
            Book:{' '}
            {dataReview?.book['@id'] && (
              <Link
                to={`${dataReview?.book['@id'].replace(/^\/admin\//, '/')}/view`}
              >{`${dataReview?.book?.title} - ${dataReview?.book?.author}`}</Link>
            )}
          </Typography>
          <Typography paragraph gutterBottom>{`Published at: ${dataReview?.publishedAt
            .slice(0, 10)
            .split('-')
            .reverse()
            .join('.')}`}</Typography>
          <Typography paragraph gutterBottom>
            Body: {dataReview?.body}
          </Typography>
          <Typography paragraph gutterBottom>
            Rating: <br /> <Rating name="rating" value={dataReview?.rating} readOnly />
          </Typography>
        </CardContent>
      </Card>
    )
  )
}
