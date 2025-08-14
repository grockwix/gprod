import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Loading } from './components/Loading.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import './styles/index.scss'

const App = lazy(() => import('./App.tsx'))

createRoot(document.getElementById('Home') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  </StrictMode>
)
