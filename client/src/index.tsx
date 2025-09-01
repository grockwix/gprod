import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Provider } from 'react-redux'
import { Loading } from './components/Loading.tsx'
import { store } from './Redux/store.ts'
import './styles/index.scss'

const App = lazy(() => import('./App.tsx'))

createRoot(document.getElementById('Home') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </Suspense>
  </StrictMode>
)
