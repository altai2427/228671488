import {Outlet} from 'react-router-dom'
import {AppHeader} from './app-header.jsx'

export function AppLayout() {

  return (
    <>
      <AppHeader />
      <main className="max-w-7xl mx-auto p-4">
        <Outlet />
      </main>
    </>
  )
}
