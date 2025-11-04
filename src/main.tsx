import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, RouterProvider } from 'react-router'


import { router } from './router.tsx'
import './normalize.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <RouterProvider router={router} />
    </HashRouter>
  </StrictMode>
)
