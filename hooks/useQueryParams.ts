import { useLocation } from 'react-router-dom'
import { useRouter } from 'next/router'

export default function useQueryParams() {
  const location = useLocation()
  const router = useRouter()

  const setQueryParam = (key: string, val: string) => {
    const queryParams = new URLSearchParams(location.search)
    queryParams.set(key, val)

    router.push({
      ...location,
      search: queryParams.toString()
    })
  }

  const setQueryParams = (params: { [key: string]: string }) => {
    const queryParams = new URLSearchParams(location.search)
    for (const [key, val] of Object.entries(params)) {
      queryParams.set(key, val)
    }

    router.push({
      ...location,
      search: queryParams.toString()
    })
  }

  const removeQueryParam = (...params: string[]) => {
    const queryParams = new URLSearchParams(location.search)

    for (const key of params) {
      if (queryParams.has(key)) {
        queryParams.delete(key)
      }
    }

    router.push({
      ...location,
      search: queryParams.toString()
    })
  }

  const getQueryParam = (key: string) => {
    return new URLSearchParams(location.search).get(key)
  }

  return {
    setQueryParam,
    setQueryParams,
    getQueryParam,
    removeQueryParam
  }
}
