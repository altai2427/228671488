import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '../../service/auth-service.js'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../hooks/use-session.js'

export function useLogout() {
  const navigate = useNavigate()
  const clearSession = useSession(state => state.reset)
  const queryClient = useQueryClient()

  const logoutMutation = useMutation({
    mutationFn: authService.logout,
    onSettled: () => {
      localStorage.removeItem('accessToken')
      clearSession()
      queryClient.invalidateQueries({ queryKey: ['products'] })
      navigate('/auth')
    }
  })

  return {
    logout: logoutMutation.mutate,
    isPending: logoutMutation.isPending,
  }
}
