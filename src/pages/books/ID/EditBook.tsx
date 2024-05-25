import {useParams} from 'react-router-dom'
import {useFetch} from '../../../utils/useFetch'
import {useEffect, useState} from 'react'
import {Button} from '@mui/material'

import {Modal} from '../../../components/Modal/Modal'
import DeleteIcon from '@mui/icons-material/Delete'
import {Book} from '../../../types/types'

export const EditBook = () => {
  const [bookData, setBookData] = useState<{title: string; author: string; condition: string}>({
    title: '',
    author: '',
    condition: ''
  })

  const [isModalShown, setIsModalShown] = useState(false)

  const {id} = useParams()
  const handleOpen = () => setIsModalShown(true)

  const {data, error} = useFetch<Book>('get', 'https://demo.api-platform.com/', `admin/books/${id}`)

  useEffect(() => {
    if (data) {
      console.log(data)
      setBookData(data)
    }
  }, [data])

  if (error) return <p>An error occurred while downloading from the api.</p>
  return (
    <>
      {data && (
        <>
          {bookData.condition}
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
