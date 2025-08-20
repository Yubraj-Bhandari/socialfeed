import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query'
import { toast } from 'sonner'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.error('Query error', error)
      toast.error('Something went wrong while fetching data', {
        description: 'Please check your connection and try again.',
      })
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      console.error('Mutation error', error)
      toast.error('Request failed', { description: 'Please try again.' })
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000 * 60,
      retry: 2,
    },
  },
});