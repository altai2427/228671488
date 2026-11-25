import { NavLink } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSession } from '../hooks/use-session'
import { useLogout } from '../store/auth/logout-store'
import { cartService } from '../service/cart-service.js'
export function AppHeader() {
  const isAuthenticated = useSession((state) => state.isAuthenticated)
  const { logout, isPending } = useLogout()

  const { data } = useQuery({
    ...cartService.getCartQueryOptions(),
    enabled: isAuthenticated,
  })
  const items = data?.items || data?.data?.items || data?.data || []
  const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0)

  const authActions = isAuthenticated ? (
    <button disabled={isPending} onClick={logout}>{isPending ? 'Logging out...' : 'Logout'}</button>
  ) : (
    <NavLink to="/auth">Sign In</NavLink>
  )
  return (
    <header className="p-4 bg-teal-500">
      <ul className="flex gap-4 text-white font-bold max-w-7xl mx-auto">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Favorites</NavLink>
        </li>
        <li>
          <NavLink to="/cart">
            Cart {isAuthenticated && count > 0 && `(${count})`}
          </NavLink>
        </li>
        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>
        <li>
          {authActions}
        </li>
      </ul>
    </header>
  )
}
