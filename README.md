# Sistema de Gestión de Costos Empresariales

Sistema completo para la gestión de costos empresariales con backend en Node.js/Express y frontend en React.

## 🏗️ Arquitectura

```
├── backend/          # API REST con Node.js, Express y Supabase
├── frontend/         # Aplicación React con Vite y Tailwind CSS
├── docker/           # Configuración Docker y scripts
└── .github/          # Workflows de CI/CD
```

## 🚀 Inicio Rápido con Docker

### Prerrequisitos

- Docker Desktop instalado
- Docker Compose instalado

### Instalación y Ejecución

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd sistema-costos-backend
   ```

2. **Iniciar todo el sistema:**
   ```bash
   # En Windows/Linux/macOS
   chmod +x docker/start.sh
   ./docker/start.sh
   
   # O directamente con Docker Compose
   docker-compose up -d
   ```

3. **Acceder a la aplicación:**
   - Frontend: http://localhost
   - Backend API: http://localhost/api
   - Base de datos: localhost:5432

### Comandos Docker Útiles

```bash
# Iniciar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down

# Reconstruir imágenes
docker-compose build --no-cache

# Ver estado de servicios
docker-compose ps

# Ejecutar comandos en contenedores
docker-compose exec backend npm run seed
docker-compose exec frontend npm run build
```

## 🛠️ Desarrollo

### Estructura del Proyecto

#### Backend (`/backend`)
- **Framework:** Node.js con Express
- **Base de datos:** Supabase (PostgreSQL)
- **Autenticación:** JWT + Passport
- **Puerto:** 3000

#### Frontend (`/frontend`)
- **Framework:** React 18
- **Build tool:** Vite
- **Styling:** Tailwind CSS
- **Estado:** React Query
- **Puerto:** 3001

#### Docker
- **Backend:** Node.js 18 Alpine
- **Frontend:** Node.js 18 Alpine
- **Base de datos:** PostgreSQL 15
- **Proxy:** Nginx

### Variables de Entorno

#### Backend
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=tu_clave_secreta_super_segura_para_jwt
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
DB_HOST=postgres
DB_PORT=5432
DB_NAME=costos_db
DB_USER=postgres
DB_PASSWORD=postgres123
```

#### Frontend
```env
VITE_API_URL=http://localhost:3000
```

## 📋 Funcionalidades

### Backend
- ✅ Autenticación JWT
- ✅ Gestión de empresas
- ✅ Gestión de productos
- ✅ Cálculo de costos
- ✅ API REST completa
- ✅ Integración con Supabase

### Frontend
- ✅ Interfaz moderna con React
- ✅ Diseño responsive con Tailwind
- ✅ Navegación con React Router
- ✅ Gestión de estado con React Query
- ✅ Formularios con React Hook Form

## 🔧 Scripts Disponibles

### Docker
```bash
./docker/start.sh    # Iniciar todo el sistema
./docker/stop.sh     # Detener todo el sistema
./docker/logs.sh     # Ver logs
```

### Backend
```bash
npm run dev          # Desarrollo con nodemon
npm start            # Producción
npm run lint         # Linting
npm run seed         # Poblar base de datos
```

### Frontend
```bash
npm run dev          # Desarrollo con Vite
npm run build        # Build de producción
npm run preview      # Preview del build
npm run lint         # Linting
```

## 🚀 Despliegue

### Desarrollo Local
```bash
docker-compose up -d
```

### Producción
```bash
# Construir imágenes de producción
docker-compose -f docker-compose.prod.yml build

# Desplegar
docker-compose -f docker-compose.prod.yml up -d
```

## 📊 Monitoreo

### Health Checks
- Backend: http://localhost/api/health
- Frontend: http://localhost
- Base de datos: Verificar logs de PostgreSQL

### Logs
```bash
# Todos los servicios
docker-compose logs -f

# Servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

## 🔒 Seguridad

- Usuarios no-root en contenedores
- Variables de entorno para secretos
- Proxy reverso con Nginx
- CORS configurado
- Helmet para headers de seguridad

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

Si tienes problemas o preguntas:

1. Revisa los logs: `docker-compose logs -f`
2. Verifica el estado de los servicios: `docker-compose ps`
3. Reconstruye las imágenes: `docker-compose build --no-cache`
4. Abre un issue en GitHub

---

**Desarrollado con ❤️ para optimizar la gestión de costos empresariales** 