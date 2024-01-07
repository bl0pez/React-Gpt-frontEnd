import { RouterProvider } from 'react-router-dom'
import { rounter } from './presentation/router/router'

export const App = () => {
  return (
    <RouterProvider router={rounter} />
  )
}
