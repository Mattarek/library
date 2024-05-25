export interface HydraSearch {
  '@type': string
  'hydra:template': string
  'hydra:variableRepresentation': string
  'hydra:mapping': {
    '@type': string
    variable: string
    property: string
    required: boolean
  }[]
}
export interface HydraView {
  '@id': string
  '@type': string
  'hydra:first': string
  'hydra:last': string
  'hydra:next': string
}

export interface Response<T> {
  '@context': string
  '@id': string
  '@type': string
  'hydra:totalItems': number
  'hydra:search': HydraSearch
  'hydra:view': HydraView
  'hydra:member': T[]
}

export interface Book {
  '@id': string
  '@type': string[]
  author: string
  book: string
  condition: string
  rating: number
  title: string
}

export interface Review {
  '@context'?: string
  '@id'?: string
  '@type'?: string
  body?: string
  book: {
    '@id'?: string
    '@type'?: string[]
    author: string
    title: string
  }
  publishedAt: string
  rating?: number
  user: {
    '@id'?: string
    '@type'?: string
    firstName?: string
    lastName?: string
    name?: string
  }
}

export interface ReviewList {
  '@id': string
  '@type': string
  body: string
  book: {
    '@id': string
    '@type': string[]
    author: string
    title: string
  }
  publishedAt: string
  rating: number
  user: {
    '@id': string
    '@type': string
    firstName: string
    lastName: string
    name: string
  }
}

export interface OpenLibraryResponse {
  publish_date: string
  title: string
  author: string
  covers: number[]
}

export interface UseFetch<T> {
  isLoading: boolean
  error: boolean
  fetchedData: Response<T>
}

export interface ErrorResponse {
  type: string
  title: string
  status: number
  detail: string
}

export type AxiosMethod = 'get' | 'post' | 'put' | 'delete'
