import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import AuthProvider from './Provider/AuthProvider.jsx'

import { ToastContainer } from 'react-toastify'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Router.jsx'
import 'leaflet/dist/leaflet.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <QueryClientProvider client={queryClient} >
       <AuthProvider>
        <>
          <RouterProvider router={router} />
          <ToastContainer />
        </>
    </AuthProvider>
     </QueryClientProvider>
  </StrictMode>,
)
