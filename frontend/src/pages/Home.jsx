import { Link } from 'react-router-dom'
import { Calculator, Building2, Package, TrendingUp } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Home = () => {
  const { user, isAuthenticated } = useAuth()

  const features = [
    {
      icon: Building2,
      title: 'Gestión de Empresas',
      description: 'Administra múltiples empresas y sus configuraciones de costos.',
    },
    {
      icon: Package,
      title: 'Control de Productos',
      description: 'Gestiona productos, materias primas y recetas de producción.',
    },
    {
      icon: Calculator,
      title: 'Cálculo de Costos',
      description: 'Calcula costos de producción de manera precisa y automatizada.',
    },
    {
      icon: TrendingUp,
      title: 'Análisis y Reportes',
      description: 'Genera reportes detallados y análisis de rentabilidad.',
    },
  ]

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        {isAuthenticated() ? (
          <>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              ¡Bienvenido de vuelta,{' '}
              <span className="text-primary-600">{user?.nombre || 'Usuario'}!</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Continúa gestionando tus costos empresariales con nuestra plataforma integral.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/dashboard"
                className="btn-primary text-lg px-8 py-3"
              >
                Ir al Dashboard
              </Link>
              <Link
                to="/empresas"
                className="btn-secondary text-lg px-8 py-3"
              >
                Gestionar Empresas
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Sistema de Gestión de{' '}
              <span className="text-primary-600">Costos Empresariales</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Optimiza tus procesos de producción y controla los costos de tu empresa
              con nuestra plataforma integral de gestión.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to="/login"
                className="btn-primary text-lg px-8 py-3"
              >
                Comenzar
              </Link>
              <Link
                to="/register"
                className="btn-secondary text-lg px-8 py-3"
              >
                Registrarse
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Features Section */}
      <div className="py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary-600">
              Características Principales
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Todo lo que necesitas para gestionar costos
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                    <feature.icon className="h-5 w-5 flex-none text-primary-600" />
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            {isAuthenticated() ? (
              <>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  ¿Listo para optimizar más costos?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
                  Explora todas las funcionalidades disponibles para maximizar la eficiencia de tu empresa.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    to="/productos"
                    className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
                  >
                    Gestionar Productos
                  </Link>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  ¿Listo para optimizar tus costos?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-200">
                  Únete a cientos de empresas que ya confían en nuestro sistema
                  para gestionar sus costos de producción.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <Link
                    to="/register"
                    className="bg-white text-primary-600 hover:bg-gray-100 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
                  >
                    Registrarse
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 