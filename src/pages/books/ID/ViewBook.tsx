import {useParams} from 'react-router-dom'
import {useFetch} from '../../../utils/useFetch'
import {useEffect, useState} from 'react'
import {Book, OpenLibraryResponse} from '../../../types/types'
import {Rating} from '@mui/material'
import axios from 'axios'

export const ViewBook = () => {
  const [bookData, setBookData] = useState({
    author: '',
    book: '',
    title: '',
    rating: 0
  })
  const [book, setBook] = useState<OpenLibraryResponse>()
  const {id} = useParams()
  const {data, error} = useFetch<Book>('get', 'https://demo.api-platform.com/', `admin/books/${id}`)

  const fetchData = async () => {
    if (data?.book) {
      setBookData(data)
      try {
        const responseBook = await axios.get(data.book)

        //const cover = response.covers[0]
        setBook(responseBook)
      } catch (error) {
        console.error('Error fetching book data:', error)
      }
    }
  }

  const fetchCover = async (id: number) => {
    const cover = await fetch(`https://covers.openlibrary.org/b/id/${id}-L.jpg`)
    const coverJson = await cover.json()
    setCover(coverJson)
    return coverJson
  }

  useEffect(() => {
    fetchData()
    fetchCover(book?.data?.covers[0])
  }, [data])

  console.log(book?.data?.covers[0])
  if (error) return <div>{error.message}</div>
  return (
    data && (
      <div>
        <p>{book?.title}</p>
        <p>{book?.author}</p>
        {book && (
          <img src={`https://covers.openlibrary.org/b/id/${book?.data?.covers[0]}-L.jpg`} alt="" />
        )}

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
        <p>{data?.title}</p>
        <p>{data?.rating}</p>
        <p>{data?.author}</p>
      </div>
    )
  )
}
