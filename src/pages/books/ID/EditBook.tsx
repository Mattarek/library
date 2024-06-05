import {useParams} from 'react-router-dom'
import {useFetch} from '../../../utils/useFetch'
import {useEffect, useState} from 'react'
import {Button, MenuItem, Select, TextField} from '@mui/material'

import {Modal} from '../../../components/Modal/Modal'
import DeleteIcon from '@mui/icons-material/Delete'
import {Book} from '../../../types/types'

export const EditBook = () => {
  const [bookData, setBookData] = useState<{title: string; author: string; condition: string}>({
    title: '',
    author: '',
    condition: 'New'
  })
  const [isModalShown, setIsModalShown] = useState(false)
  const {id} = useParams()
  const handleOpen = () => setIsModalShown(true)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    setBookData(prevData => ({...prevData, [name]: value}))
  }

  const handleSelectChange = e => {
    console.log(e.target.value)
    setBookData(p => ({...p, condition: e.target.value as string}))
  }

  const {data, error} = useFetch<Book>('get', 'https://demo.api-platform.com/', `admin/books/${id}`)

  useEffect(() => {
    if (!data) return
    let condition = ''

    switch (data.condition) {
      case 'https://schema.org/UsedCondition':
        condition = 'Used'
        break
      case 'https://schema.org/DamagedCondition':
        condition = 'Damaged'
        break
      case 'https://schema.org/RefurbishedCondition':
        condition = 'Refurbished'
        break
      case 'https://schema.org/NewCondition':
        condition = 'New'
        break
      default:
        condition = 'Unknown'
    }

    setBookData(p => ({
      title: data.title,
      author: data.author,
      condition: condition
    }))
  }, [data])
  console.log(data)

  if (error) return <p>An error occurred while downloading from the api.</p>
  return (
    <>
      {data && (
        <>
          <TextField
            name="title"
            value={`${bookData.title} - ${bookData.author}`}
            onChange={handleInputChange}
            label="Title"
          />
          <br />
          <Select value={bookData.condition} onChange={handleSelectChange}>
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Refurbished">Refurbished</MenuItem>
            <MenuItem value="Used">Used</MenuItem>
            <MenuItem value="Damaged">Damaged</MenuItem>
          </Select>
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
