import { useMutation } from '@tanstack/react-query'
import { authService } from '../../service/auth-service.js'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../hooks/use-session.js'

export function useLogin() {
  const navigate = useNavigate()
  const setAuthenticated = useSession((state) => state.setAuthenticated)

  const loginMutation = useMutation({
    mutationFn: async (loginData) => {
      const res = await authService.login(loginData)
      return res
    },
    onSuccess: (data) => {
      const token =
        data?.token ||
        data?.accessToken ||
        data?.access_token ||
        data?.data?.token ||
        data?.data?.accessToken

      if (token) {
        localStorage.setItem('accessToken', token)
      }

      setAuthenticated(true)
      navigate('/')
    },
    onError: (error) => {
      console.error('Login failed:', error)
      alert('Login failed. Please try again.')
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const loginData = {
      loginOrEmail: formData.get('loginOrEmail') || "",
      password: formData.get('password') || "",
    }

    loginMutation.mutate(loginData)

    e.target.reset()
  }

  return {
    handleSubmit,
    isPending: loginMutation.isPending,
  }
}
