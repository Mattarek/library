import {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import {Button, Rating} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import {GridColDef} from '@mui/x-data-grid'
import {DataGrid} from '../../components/DataGrid/DataGrid'
import {useFetch} from '../../utils/useFetch'
import {Book, Response} from '../../types/types'
import {FormikForms} from '../../components/Form/Form'

const columns: GridColDef[] = [
  {
    headerName: 'Title',
    field: 'title',
    resizable: false,
    sortable: true,
    minWidth: 150,
    flex: 1
  },
  {
    headerName: 'Author',
    field: 'author',
    resizable: false,
    sortable: true,
    minWidth: 150,
    flex: 1
  },
  {
    headerName: 'Data publikacji',
    field: 'publishDate',
    resizable: false,
    sortable: true,
    minWidth: 150,
    flex: 1
  },
  {
    headerName: 'Rating',
    field: 'rating',
    resizable: false,
    sortable: true,
    minWidth: 150,
    flex: 1,
    renderCell: ({row}: {row: Book}) => <Rating value={row.rating} readOnly />
  },
  {
    headerName: 'View',
    renderCell: ({id}: {id: string | number}) => (
      <NavLink to={`${id}/view`}>
        <Button startIcon={<VisibilityIcon />}>View</Button>
      </NavLink>
    ),
    resizable: false,
    sortable: false,
    field: 'view',
    minWidth: 150,
    flex: 1
  },
  {
    headerName: 'Edit',
    renderCell: ({id}: {id: string | number}) => (
      <NavLink to={`${id}/edit`}>
        <Button startIcon={<EditIcon />}>Edit</Button>
      </NavLink>
    ),
    resizable: false,
    sortable: false,
    field: 'edit',
    minWidth: 150,
    flex: 1
  }
]

function parseDate(dateString: string): string {
  let date: Date

  if (/^\d{4}$/.test(dateString)) {
    date = new Date(parseInt(dateString), 0, 1)
  } else if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    date = new Date(dateString)
  } else if (/^[a-zA-Z]+\s\d{4}$/.test(dateString)) {
    date = new Date(dateString)
  } else {
    throw new Error('Nieznany format daty: ' + dateString)
  }

  return date.toISOString().split('T')[0]
}

export const Books = () => {
  const [pageState, setPageState] = useState<{
    isLoading: boolean
    data: Book[]
    total: number
    page: number
    pageSize: number
  }>({
    isLoading: true,
    data: [],
    total: 0,
    page: 1,
    pageSize: 5
  })

  const [searchParams, setSearchParams] = useState(
    `?page=${pageState.page}&itemsPerPage=${pageState.pageSize}`
  )

  const handlePageState = (newPage: {page: number; pageSize: number}) => {
    setPageState(prev => ({
      ...prev,
      page: newPage.page + 1,
      pageSize: newPage.pageSize
    }))
    setSearchParams(`?page=${newPage.page + 1}&itemsPerPage=${newPage.pageSize}`)
  }

  const handleSubmit = (values: {author: string; title: string; condition: string}) => {
    let query = ''
    const {author, title, condition} = values

    if (author) query += `?author=${author}`
    if (title) query += author ? `&title=${title}` : `?title=${title}`
    if (condition) query += author || title ? `&condition=${condition}` : `?condition=${condition}`
    if (!author && !title && !condition)
      query = `?page=${pageState.page}&itemsPerPage=${pageState.pageSize}`
    setPageState(prev => ({
      ...prev,
      page: 1
    }))
    setSearchParams(query)
  }

  const {data} = useFetch<Response<Book>>(
    'get',
    `https://demo.api-platform.com/admin/books`,
    searchParams
  )

  useEffect(() => {
    setPageState(p => ({...p, isLoading: true}))
    if (!data?.['hydra:member'] || !data?.['hydra:totalItems']) return
    const fetchAndModifyData = async () => {
      const modifiedData = await Promise.all(
        data['hydra:member'].map(async item => {
          try {
            const response = await fetch(item.book)
            const pubJSON = await response.json()
            const date = parseDate(pubJSON.publish_date)

            return {
              ...item,
              publishDate: date
            }
          } catch (error) {
            console.error('Error fetching data:', error)
            return item
          }
        })
      )

      setPageState(prev => ({
        ...prev,
        isLoading: false,
        total: data['hydra:totalItems'],
        data: modifiedData
      }))
    }

    fetchAndModifyData()
  }, [data])

  return (
    <>
      <FormikForms handleSubmit={handleSubmit} />
      <DataGrid
        columns={columns}
        pageState={pageState}
        loading={pageState.isLoading}
        onPaginationModelChange={handlePageState}
      />
    </>
  )
}
