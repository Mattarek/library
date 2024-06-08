import {Formik, Field, Form} from 'formik'
import {Box, TextField, Button} from '@mui/material'

interface Props {
  handleSubmit: (values: {author: string; title: string; condition: string}) => void
}

export const FormikForms = ({handleSubmit}: Props) => {
  return (
    <div>
      <Formik initialValues={{author: '', title: '', condition: ''}} onSubmit={handleSubmit}>
        <Form>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center'
            }}
          >
            <Field as={TextField} id="title" name="title" placeholder="Title" />
            <Field as={TextField} id="author" name="author" placeholder="Author" />
            <Field as={TextField} id="condition" name="condition" placeholder="Condition" />
          </Box>
          <Box sx={{display: 'flex', justifyContent: 'center'}}>
            <Button variant="contained" type="submit">
              Search
            </Button>
          </Box>
        </Form>
      </Formik>
    </div>
  )
}
