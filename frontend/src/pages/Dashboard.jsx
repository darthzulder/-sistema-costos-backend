import { TrendingUp, Building2, Package, DollarSign } from 'lucide-react'

const Dashboard = () => {
  const stats = [
    { name: 'Empresas Activas', value: '12', icon: Building2, change: '+2.5%', changeType: 'positive' },
    { name: 'Productos', value: '156', icon: Package, change: '+12.3%', changeType: 'positive' },
    { name: 'Costos Promedio', value: '$2,450', icon: DollarSign, change: '-5.2%', changeType: 'negative' },
    { name: 'Eficiencia', value: '94.2%', icon: TrendingUp, change: '+1.8%', changeType: 'positive' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Resumen general del sistema de costos</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-8 w-8 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="text-lg font-medium text-gray-900">{stat.value}</dd>
                </dl>
              </div>
            </div>
            <div className="mt-4">
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Content Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Nuevo producto agregado: "Producto A"</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Costo actualizado: Empresa XYZ</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Reporte generado: Análisis mensual</span>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Próximas Acciones</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Revisar costos de materia prima</span>
              <span className="text-xs text-gray-400">Hoy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Actualizar precios de proveedores</span>
              <span className="text-xs text-gray-400">Mañana</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Generar reporte trimestral</span>
              <span className="text-xs text-gray-400">En 3 días</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 