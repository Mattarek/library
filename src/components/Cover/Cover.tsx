import {Box, Rating} from '@mui/material'
import {useEffect, useState} from 'react'
import {Description} from '../Description/Description'
import {BookCover} from '../../types/types'
import {Comments} from '../Comments/Comments'

interface Props {
  data: {
    rating: number
    book: string
    title: string
  }
}

export const Cover = ({data}: Props) => {
  const [bookCover, setBookCover] = useState<BookCover>()
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
        {data?.title ? <Box>Tytuł: {data?.title ? data?.title : bookCover?.full_title}</Box> : null}
        {bookCover?.publish_date ? <Box>Rok publikacji: {bookCover?.publish_date}</Box> : null}
        {bookCover?.number_of_pages ? <Box>Ilość stron: {bookCover?.number_of_pages}</Box> : null}
        {data?.rating ? <Rating value={data?.rating} readOnly /> : null}
        <br />
        {bookCover ? <Description book={bookCover} /> : null}
      </Box>
      <br />
      {/* <Comments /> */}
    </Box>
  )
}
