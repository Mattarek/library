import {useState, useContext, useEffect} from 'react'
import axios, {AxiosError} from 'axios'
import {AuthContext, IAuthContext} from 'react-oauth2-code-pkce'
import {AxiosMethod} from '../types/types'

export const useFetch = <T>(method: AxiosMethod, baseUrl: string, params?: string, body?: any) => {
  const {token} = useContext<IAuthContext>(AuthContext)
  const [data, setData] = useState<T>()
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<AxiosError | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const dataResponse = await axios({
        method,
        data: body,
        headers: {Authorization: `Bearer ${token}`},
        url: `${baseUrl}${params ?? ''}`
      })

      setData(dataResponse.data)
    } catch (error) {
      const err = error as AxiosError
      setError(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [method, baseUrl, params])

  return {data, isLoading, error}
}
