import {useParams} from 'react-router-dom'
import {useFetch} from '../../../utils/useFetch'
import {Book} from '../../../types/types'
import {Cover} from '../../../components/Cover/Cover'
import {Comments} from '../../../components/Comments/Comments'

export const ViewBook = () => {
  const {id} = useParams()
  const {data, error} = useFetch<Book>('get', 'https://demo.api-platform.com/', `admin/books/${id}`)

  if (error) return <div>{error.message}</div>
  return (
    data && (
      <>
        <Cover data={data} />
        <Comments />
      </>
    )
  )
}
