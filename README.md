# 🏢 Sistema de Gestión de Costos - Backend

Sistema backend para la gestión integral de costos empresariales, desarrollado en Node.js con Express y Supabase como base de datos en la nube.

## 📋 Descripción

Este proyecto proporciona una API REST completa para gestionar:
- **Usuarios y autenticación** (manual y Google OAuth)
- **Empresas y sus configuraciones**
- **Productos y recetas**
- **Materias primas y proveedores**
- **Rubros de negocio**
- **Licencias de usuarios**

Ideal para empresas del sector alimenticio (panaderías, galleterías, etc.) que necesitan controlar costos de producción.

## 🚀 Características

- ✅ **Autenticación JWT** con registro y login
- ✅ **Integración con Google OAuth**
- ✅ **Base de datos en la nube** (Supabase)
- ✅ **Docker** para desarrollo y despliegue
- ✅ **Middleware de seguridad** (Helmet, CORS)
- ✅ **Gestión de permisos** por empresa
- ✅ **API RESTful** completa
- ✅ **Logging** con Morgan
- ✅ **Scripts de datos de prueba** incluidos

## 🛠️ Tecnologías

- **Backend**: Node.js, Express.js
- **Base de Datos**: PostgreSQL (Supabase)
- **Autenticación**: JWT, Passport.js, Google OAuth
- **Seguridad**: bcrypt, helmet, cors
- **Contenedores**: Docker, Docker Compose
- **Logging**: Morgan
- **Linting**: ESLint

## 📦 Instalación

### Prerrequisitos

- **Docker Desktop** (requerido)
- Cuenta en Supabase

### Opción 1: Docker (Recomendado)

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/sistema-costos-backend.git
cd sistema-costos-backend

# Configurar variables de entorno
cp process.env.example .env
# Editar .env con tus credenciales de Supabase

# Ejecutar con Docker
docker-compose up --build -d

# Verificar que esté corriendo
docker-compose ps

# Ver logs en tiempo real
docker-compose logs -f
```

### Opción 2: Desarrollo Local (Opcional)

Si prefieres desarrollar sin Docker, necesitarás:

- Node.js 18+ 
- npm o yarn

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/sistema-costos-backend.git
cd sistema-costos-backend

# Instalar dependencias
npm install

# Configurar variables de entorno
cp process.env.example .env
# Editar .env con tus credenciales de Supabase

# Ejecutar en desarrollo
npm run dev
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` con las siguientes variables:

```env
# Supabase
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase

# JWT
JWT_SECRET=tu_clave_secreta_super_segura

# Servidor
PORT=3000
NODE_ENV=development

# Google OAuth (opcional)
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret

# Base de datos local (opcional)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=costos_db
DB_USER=postgres
DB_PASSWORD=postgres123
```

### Configuración de Supabase

1. Crea un proyecto en [Supabase](https://supabase.com)
2. Ejecuta el script SQL para crear las tablas:

```sql
-- Crear tabla Pais
CREATE TABLE IF NOT EXISTS Pais (
    IDPais SERIAL PRIMARY KEY,
    Nom_Pais VARCHAR(100) NOT NULL,
    Codigo_Cel VARCHAR(10)
);

-- Crear tabla Moneda
CREATE TABLE IF NOT EXISTS Moneda (
    IDMoneda SERIAL PRIMARY KEY,
    Nom_Moneda VARCHAR(50) NOT NULL,
    Simbolo VARCHAR(10)
);

-- Crear tabla Usuario
CREATE TABLE IF NOT EXISTS Usuario (
    IDUsuario SERIAL PRIMARY KEY,
    Correo VARCHAR(100) UNIQUE NOT NULL,
    Nombre VARCHAR(100) NOT NULL,
    Clave VARCHAR(255),
    Celular VARCHAR(20),
    IDPais INTEGER REFERENCES Pais(IDPais),
    Tipo_Usuario VARCHAR(20) DEFAULT 'manual'
);

-- ... (resto de tablas en db/init/01-init.sql)
```

## 📚 API Endpoints

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/auth/register` | Registro de usuario |
| POST | `/auth/login` | Login de usuario |
| GET | `/auth/google` | Login con Google |
| GET | `/auth/google/callback` | Callback de Google OAuth |

### Empresas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/empresas` | Crear empresa |
| GET | `/empresas/:id` | Obtener empresa |
| GET | `/empresas` | Listar empresas del usuario |

### Rutas de Prueba

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/test/protegido` | Ruta de prueba protegida |

## 🔐 Autenticación

### Registro de Usuario

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "correo": "usuario@ejemplo.com",
    "nombre": "Usuario Ejemplo",
    "clave": "contraseña123"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "correo": "usuario@ejemplo.com",
    "clave": "contraseña123"
  }'
```

### Uso del Token

```bash
curl -X GET http://localhost:3000/empresas \
  -H "Authorization: Bearer TU_TOKEN_JWT"
```

## 🐳 Docker

### Comandos Útiles

```bash
# Construir y ejecutar
docker-compose up --build -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Reconstruir
docker-compose up --build -d
```

### Estructura de Contenedores

- **backend**: Aplicación Node.js (puerto 3000)
- **Base de datos**: Supabase (remota)

## 🧪 Pruebas y Datos de Test

### Scripts de Datos de Prueba

```bash
# Insertar datos de prueba básicos
npm run seed

# Insertar datos de prueba completos
npm run insert-test

# O ejecutar directamente
node seedTest.js
node insert-test-data.js
```

### Usuario de Prueba

- **Email**: test@example.com
- **Contraseña**: 123456

### Archivos de Test

El proyecto incluye múltiples archivos de test en `db/tests/` para insertar datos de prueba de:
- Países y monedas
- Empresas y rubros
- Usuarios y licencias
- Proveedores y materias primas
- Productos y recetas

## 📁 Estructura del Proyecto

```
backend/
├── config/           # Configuraciones (Passport, etc.)
├── controllers/      # Controladores de la API
├── db/              # Base de datos y scripts
│   ├── inserts/     # Funciones de inserción
│   ├── scripts/     # Scripts de datos
│   └── tests/       # Tests de inserción
├── middlewares/     # Middlewares personalizados
├── routes/          # Rutas de la API
├── services/        # Servicios de negocio
├── Dockerfile       # Configuración Docker
├── docker-compose.yml
├── docker-start.sh  # Script de inicio Docker
├── test-connection.js # Test de conexión a BD
├── supabaseClient.js # Cliente de Supabase
└── server.js        # Punto de entrada
```

## 🔧 Desarrollo

### Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Producción
npm start

# Linting
npm run lint
npm run lint:fix

# Docker
npm run docker:build
npm run docker:run
npm run docker:compose
npm run docker:logs
npm run docker:down

# Datos de prueba
npm run seed
npm run insert-test
```

### Agregar Nuevas Rutas

1. Crear controlador en `controllers/`
2. Crear ruta en `routes/`
3. Registrar en `server.js`

## 🚀 Despliegue

### Producción con Docker

```bash
# Construir imagen de producción
docker build -t sistema-costos-backend .

# Ejecutar en producción
docker run -p 3000:3000 \
  -e NODE_ENV=production \
  -e SUPABASE_URL=tu_url \
  -e SUPABASE_ANON_KEY=tu_key \
  sistema-costos-backend
```

### Variables de Entorno de Producción

```env
NODE_ENV=production
PORT=3000
JWT_SECRET=clave_super_segura_produccion
SUPABASE_URL=tu_url_produccion
SUPABASE_ANON_KEY=tu_key_produccion
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

- **Email**: soporte@ejemplo.com
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/sistema-costos-backend/issues)
- **Documentación**: [Wiki del proyecto](https://github.com/tu-usuario/sistema-costos-backend/wiki)

## 🗺️ Roadmap

### Funcionalidades Pendientes

- [ ] **Tests unitarios y de integración** - Implementar suite de pruebas automatizadas
- [ ] **Documentación con Swagger** - Generar documentación interactiva de la API
- [ ] **Rate limiting** - Implementar límites de velocidad para proteger la API
- [ ] **Cache con Redis** - Optimizar rendimiento con sistema de caché
- [ ] **Notificaciones por email** - Sistema de notificaciones automáticas
- [ ] **Dashboard de métricas** - Panel de control con estadísticas del sistema
- [ ] **API para móviles** - Endpoints optimizados para aplicaciones móviles

### Mejoras Técnicas

- [ ] **Validación de datos** - Middleware de validación robusto
- [ ] **Logging avanzado** - Sistema de logs estructurados
- [ ] **Monitoreo** - Integración con herramientas de monitoreo
- [ ] **Backup automático** - Sistema de respaldo de datos
- [ ] **CI/CD** - Pipeline de integración y despliegue continuo

---

**Desarrollado con ❤️ para la gestión eficiente de costos empresariales** 