import {useEffect, useState} from 'react'

interface Props {
  book: string
}
export const Cover = ({book}: Props) => {
  const [bookCover, setBookCover] = useState<{covers: number[]}>()

  useEffect(() => {
    fetch(book)
      .then(response => response.json())
      .then(responseJson => {
        setBookCover(responseJson)
      })
  }, [])
  console.log(bookCover)

  return (
    <>
      {book && (
        <img src={`https://covers.openlibrary.org/b/id/${bookCover?.covers[0]}-L.jpg`} alt="" />
      )}
    </>
  )
}
