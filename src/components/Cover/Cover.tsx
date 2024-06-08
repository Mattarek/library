import {Box, Rating, Typography} from '@mui/material'
import {useEffect, useState} from 'react'
import {BookCover} from '../../types/types'

interface Props {
  data: {
    rating: number
    book: string
    title: string
  }
}

interface Work {
  description: {
    value: string
  }
  covers: number[]
}

export const Cover = ({data}: Props) => {
  const [bookCover, setBookCover] = useState<BookCover>()
  const [works, setWorks] = useState<Work>()

  useEffect(() => {
    data?.book &&
      fetch(data.book)
        .then(response => response.json())
        .then(responseJson => {
          setBookCover(responseJson)
        })
  }, [])

  useEffect(() => {
    if (!bookCover?.works) return
    fetch(`https://openlibrary.org${bookCover?.works[0].key}.json`)
      .then(response => response.json())
      .then(responseJson => {
        setWorks(responseJson)
      })
  }, [bookCover])

  const coverId = bookCover?.covers?.[0] ?? works?.covers?.[0]
  const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : null

  return (
    <Box sx={{display: 'flex'}}>
      {coverUrl ? (
        <Box
          sx={{width: '300px', height: '520px'}}
          component="img"
          src={coverUrl}
          alt="Book cover"
        />
      ) : (
        <Box sx={{color: 'rgba(0, 0, 0, 0.5)'}}>No cover</Box>
      )}
      <Box sx={{marginLeft: '30px'}}>
        {data?.title ? <Box>Tytuł: {data?.title ? data?.title : bookCover?.full_title}</Box> : null}
        {bookCover?.publish_date ? <Box>Rok publikacji: {bookCover?.publish_date}</Box> : null}
        {bookCover?.number_of_pages ? <Box>Ilość stron: {bookCover?.number_of_pages}</Box> : null}
        {data?.rating ? <Rating value={data?.rating} readOnly /> : null}
        <br />
        {bookCover ? (
          <Typography paragraph>{works?.description?.value}</Typography>
        ) : (
          <p>This book has no description.</p>
        )}
      </Box>
      <br />
    </Box>
  )
}
