import { useQuery } from '@tanstack/react-query'
import { getBlocks } from 'api'

export const useBlocksQuery = (state: string) => {
  return useQuery({
    queryFn: () => getBlocks(state),
    queryKey: ['blocks', state],
    staleTime: 1000 * 5, // это время в течение которого мы сначала смотрим в кеш, по истечении этого времени - идет запрос на серер
  })
}
