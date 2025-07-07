import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/Layout'
import LoadingSpinner from './components/LoadingSpinner'

// Lazy loading de páginas
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Empresas = lazy(() => import('./pages/Empresas'))
const Productos = lazy(() => import('./pages/Productos'))
const Costos = lazy(() => import('./pages/Costos'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <Layout>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/empresas" element={<Empresas />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/costos" element={<Costos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

export default App 