import {useParams} from 'react-router-dom'
import {useFetch} from '../../../utils/useFetch'
import {useEffect, useState} from 'react'
import {Book} from '../../../types/types'
import {Rating} from '@mui/material'
import {Cover} from '../../../components/Cover/Cover'

export const ViewBook = () => {
  const {id} = useParams()
  const {data, error} = useFetch<Book>('get', 'https://demo.api-platform.com/', `admin/books/${id}`)
  const [bookData, setBookData] = useState({
    author: '',
    book: '',
    title: '',
    rating: 0
  })

  useEffect(() => {
    if (!data) return
    setBookData(data)
  }, [data])

  if (error) return <div>{error.message}</div>
  return (
    data && (
      <div>
        <p>{bookData?.title}</p>
        <p>{bookData?.author}</p>
        <Cover book={data.book} />
        <Rating
          name="simple-controlled"
          value={bookData.rating}
          onChange={(_, newValue) => {
            if (newValue) {
              setBookData(prev => ({
                ...prev,
                rating: newValue
              }))
            }
          }}
        />
      </div>
    )
  )
}
