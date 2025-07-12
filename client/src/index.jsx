import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Loading } from './components/Loading.jsx'
import './styles/index.scss'

const App = lazy(() => import('./App.jsx'))

createRoot(document.getElementById('Home')).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </StrictMode>
)
