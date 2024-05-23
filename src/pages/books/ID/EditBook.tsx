import { useParams } from 'react-router-dom'
import { useFetch } from '../../../utils/useFetch'
import { useEffect, useState } from 'react'
import { Button } from '@mui/material'

import { Modal } from '../../../components/Modal/Modal'
import DeleteIcon from '@mui/icons-material/Delete'

export const EditBook = () => {
  const [bookData, setBookData] = useState(null)
  const [isModalShown, setIsModalShown] = useState(false)

  const { id } = useParams()
  const handleOpen = () => setIsModalShown(true)

  const { fetchedData, error } = useFetch(
    'get',
    'https://demo.api-platform.com/',
    `admin/books/${id}`
  )

  useEffect(() => {
    if (fetchedData) {
      setBookData(fetchedData)
    }
  }, [fetchedData, bookData])

  if (error) return <p>An error occurred while downloading from the api.</p>
  return (
    <>
      {bookData && (
        <>
          <div>{bookData.title}</div>

          <Button onClick={handleOpen}>
            <DeleteIcon />
            Delete
          </Button>
          <Modal state={isModalShown} setOpen={setIsModalShown} />
        </>
      )}
    </>
  )
}
