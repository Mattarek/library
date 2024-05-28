import React, {useState, useContext} from 'react'
import {Formik, Field, Form} from 'formik'
import axios from 'axios'
import {AuthContext, IAuthContext} from 'react-oauth2-code-pkce'

interface FormValues {
  author?: string
  title?: string
  condition?: string
  onDataChange: (data: Book[]) => void // Dodajemy funkcję onDataChange, która przyjmuje dane książek
}

const FormikForms: React.FC<FormValues> = ({onDataChange}) => {
  const {token} = useContext<IAuthContext>(AuthContext)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (values: FormValues) => {
    const params = new URLSearchParams()
    if (values.author) params.append('author', values.author)
    if (values.title) params.append('title', values.title)
    if (values.condition) params.append('condition', values.condition)

    const queryString = `?${params.toString()}`
    const url = `https://demo.api-platform.com/admin/books/${queryString}`

    setIsLoading(true)
    setError(null)

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      onDataChange(response.data['hydra:member']) // Przekazujemy dane książek do funkcji onDataChange
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <h1>Book Search</h1>
      <Formik initialValues={{author: '', title: '', condition: ''}} onSubmit={handleSubmit}>
        <Form>
          <div>
            <label htmlFor="author">Author:</label>
            <Field id="author" name="author" placeholder="Search by Author" />
          </div>
          <div>
            <label htmlFor="title">Title:</label>
            <Field id="title" name="title" placeholder="Search by Title" />
          </div>
          <div>
            <label htmlFor="condition">Condition:</label>
            <Field id="condition" name="condition" placeholder="Search by Condition" />
          </div>
          <button type="submit">Search</button>
        </Form>
      </Formik>
    </div>
  )
}

export default FormikForms
