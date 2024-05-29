import {Box, Rating} from '@mui/material'
import {useEffect, useState} from 'react'
import {Description} from '../Description/Description'
import {BookCover} from '../../types/types'

interface Props {
  data: {
    rating: number
    book: string
    title: string
  }
}

export const Cover = ({data}: Props) => {
  const [bookCover, setBookCover] = useState<BookCover>()
  console.log(bookCover)
  useEffect(() => {
    data?.book &&
      fetch(data.book)
        .then(response => response.json())
        .then(responseJson => {
          setBookCover(responseJson)
        })
  }, [])

  return (
    <Box sx={{display: 'flex'}}>
      <Box>
        {bookCover?.covers ? (
          <Box
            sx={{width: '300px', height: '520px'}}
            component="img"
            src={`https://covers.openlibrary.org/b/id/${bookCover?.covers[0]}-L.jpg`}
            alt="Book cover"
          />
        ) : (
          <div>Cover not found</div>
        )}
      </Box>
      <Box sx={{marginLeft: '30px'}}>
        <Box>Tytuł: {data?.title ? data?.title : bookCover?.full_title}</Box>
        <Box>Rok publikacji: {bookCover?.publish_date}</Box>
        <Box>Ilość stron: {bookCover?.number_of_pages}</Box>
        <Rating value={data?.rating} readOnly />
        {bookCover && <Description book={bookCover} />}
      </Box>
    </Box>
  )
}
