import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Loading } from './components/Loading.tsx'
import './styles/index.scss'

const App = lazy(() => import('./App.tsx'))

createRoot(document.getElementById('Home') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </StrictMode>
)
