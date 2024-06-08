import {useParams} from 'react-router-dom'
import {useFetch} from '../../../utils/useFetch'
import {useContext, useEffect, useState} from 'react'
import {Button, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material'
import {Modal} from '../../../components/Modal/Modal'
import {Book} from '../../../types/types'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import axios from 'axios'
import {AuthContext, IAuthContext} from 'react-oauth2-code-pkce'

export const EditBook = () => {
  const {token} = useContext<IAuthContext>(AuthContext)
  const [bookData, setBookData] = useState<{book: string; condition: string}>({
    book: '',
    condition: 'New'
  })
  const [isModalShown, setIsModalShown] = useState(false)
  const {id} = useParams()
  const handleOpen = () => setIsModalShown(true)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    console.log(name, value)
    setBookData(prevData => ({...prevData, [name]: value}))
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

    setBookData(_ => ({
      book: `${data.title} - ${data.author}`,
      condition
    }))
  }, [data])

  const handleSelectChange = (e: SelectChangeEvent) => {
    setBookData(p => ({...p, condition: e.target.value}))
  }

  const handleEditData = async () => {
    try {
      const response = await axios({
        method: 'PUT',
        headers: {Authorization: `Bearer ${token}`},
        url: `https://demo.api-platform.com/admin/books/${id}`,
        data: bookData
      })
      console.log(response)
    } catch (error) {
      console.error('Błąd przy aktualizacji danych:', error)
    }
  }

  if (error) return <p>An error occurred while downloading from the api.</p>
  return (
    <>
      {data && (
        <form>
          <TextField name="book" value={bookData.book} onChange={handleInputChange} label="Title" />
          <br />
          <Select value={bookData.condition} onChange={handleSelectChange}>
            <MenuItem value="New">New</MenuItem>
            <MenuItem value="Refurbished">Refurbished</MenuItem>
            <MenuItem value="Used">Used</MenuItem>
            <MenuItem value="Damaged">Damaged</MenuItem>
          </Select>
          <br />
          <Button onClick={handleEditData}>
            <EditIcon />
            Edit
          </Button>
          <Button onClick={handleOpen}>
            <DeleteIcon />
            Delete
          </Button>
          <Modal state={isModalShown} setOpen={setIsModalShown} />
        </form>
      )}
    </>
  )
}
