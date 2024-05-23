import { useParams } from 'react-router-dom'
import { useFetch } from '../../../utils/useFetch'
import { Rating } from '@mui/material'
import { useEffect, useState } from 'react'
import { Review } from '../../../types/types'

export const ViewReview = () => {
  const { id } = useParams()
  const [dataReview, setDataReview] = useState({
    rating: 0,
    book: { title: '' },
    body: '',
    user: {
      name: ''
    },
    publishedAt: ''
  })

  const { data } =
    useFetch < Review > ('get', 'https://demo.api-platform.com/', `admin/reviews/${id}`)

  useEffect(() => {
    if (!data) return
    setDataReview(data)
  }, [data])

  return (
    data && (
      <div>
        <div>Author: {dataReview?.user.name}</div>
        <div>Book: {dataReview?.book?.title}</div>
        <div>
          {`Published at: ${dataReview?.publishedAt.slice(0, 10).split('-').reverse().join('.')}`}
        </div>
        <div>
          Rating: <Rating name="rating" value={dataReview?.rating} readOnly />
        </div>
        <div>Body: {dataReview?.body}</div>
      </div>
    )
  )
}
