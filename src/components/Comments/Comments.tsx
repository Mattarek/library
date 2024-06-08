import {Link, useParams} from 'react-router-dom'
import {useFetch} from '../../utils/useFetch'
import {
  Box,
  Pagination,
  Rating,
  PaginationItem,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'
import {useEffect, useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

interface Comments {
  'hydra:member': Comment[]
  'hydra:totalItems': number
}

interface Comment {
  '@id': string
  body: string
  book: string
  publishedAt: string
  rating: number
  user: {firstName: string; lastName: string; name: string}
}

export const Comments = () => {
  const [comments, setComments] = useState<Comments>()
  const [commentsCount, setCommentsCount] = useState({page: 1, perPage: 5})
  const {id} = useParams()
  const {data, error} = useFetch<Comments>(
    'get',
    'https://demo.api-platform.com/',
    `books/${id}/reviews?page=${commentsCount.page}&itemsPerPage=${commentsCount.perPage}`
  )

  useEffect(() => {
    if (!data) return
    setComments(data)
  }, [data])

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCommentsCount(p => ({
      ...p,
      page: value
    }))
  }

  if (error) return
  return (
    <>
      {comments?.['hydra:totalItems'] ? (
        <>
          <br />
          <>
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
              <Typography variant="h4">Komentarze</Typography>
            </Box>
            <br />
            {comments?.['hydra:member']?.map(comment => {
              return (
                <Accordion key={comment['@id']} disableGutters square>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    <Typography>
                      <Link
                        style={{textDecoration: 'none', color: '#1976d2'}}
                        to={`${comment?.['@id']?.match(/\/reviews\/[a-f0-9-]+/)?.[0]}/view`}
                      >
                        {comment.user.name}
                      </Link>
                    </Typography>
                    <Rating value={comment.rating} readOnly />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography sx={{marginLeft: '.5rem'}}>{comment.body}</Typography>
                  </AccordionDetails>
                </Accordion>
              )
            })}
          </>
          <br />
          {comments?.['hydra:totalItems'] ? (
            <Box sx={{display: 'flex', justifyContent: 'center', marginBottom: '0'}}>
              <Pagination
                color="primary"
                defaultPage={1}
                page={commentsCount.page}
                count={Math.ceil(comments?.['hydra:totalItems'] / 5)}
                onChange={handleChange}
                renderItem={item => (
                  <PaginationItem
                    slots={{previous: ArrowBackIcon, next: ArrowForwardIcon}}
                    {...item}
                  />
                )}
              />
            </Box>
          ) : null}
        </>
      ) : null}
    </>
  )
}
