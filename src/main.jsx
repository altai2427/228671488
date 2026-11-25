import {createRoot} from 'react-dom/client'
import './index.css'
import {RouterProvider} from 'react-router-dom'
import {routes} from './router.js'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3, // 3 minutes
    }
  }
})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={routes} />
  </QueryClientProvider>
)
