# Configuración del Sistema de Costos

## Variables de Entorno

### Backend (.env en la carpeta backend/)

```bash
# Database Configuration (PostgreSQL/Supabase)
DB_USER=tu_usuario_db
DB_HOST=tu_host_db
DB_NAME=tu_nombre_db
DB_PASSWORD=tu_password_db
DB_PORT=5432
DB_SSL=true

# Supabase Configuration
SUPABASE_URL=tu_url_supabase
SUPABASE_ANON_KEY=tu_clave_anonima_supabase

# JWT Configuration
JWT_SECRET=tu_clave_secreta_super_segura_para_jwt

# Server Configuration
PORT=3000
NODE_ENV=development

# Session Configuration
SESSION_SECRET=tu_clave_secreta_super_segura_para_sesion

# Frontend URLs (for CORS and redirects)
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:3000

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
```

### Frontend (.env en la carpeta frontend/)

```bash
# Backend API URL
VITE_API_URL=http://localhost:3000

# Environment
VITE_NODE_ENV=development
```

### Docker (.env en la raíz del proyecto)

```bash
# Docker Environment Variables
NODE_ENV=development

# Backend Configuration
BACKEND_PORT=3000

# Frontend Configuration
FRONTEND_PORT=3001
VITE_API_URL=http://localhost:3000

# Nginx Configuration
NGINX_HTTP_PORT=80
NGINX_HTTPS_PORT=443
NGINX_SERVER_NAME=localhost
```

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <url-del-repositorio>
   cd sistema-costos-backend
   ```

2. **Configurar variables de entorno**
   - Copiar `backend/process.env.example` a `backend/.env`
   - Copiar `frontend/env.example` a `frontend/.env`
   - Copiar `docker.env.example` a `.env` (para Docker)
   - Editar los archivos .env con tus valores reales

3. **Instalar dependencias**
   ```bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   ```

4. **Ejecutar con Docker**
   ```bash
   docker-compose up -d
   ```

## Archivos Corregidos

Se han eliminado todos los valores hardcodeados de los siguientes archivos:

### Backend
- ✅ `seedTest.js` - Configuración de base de datos
- ✅ `verify-configuration.js` - Configuración de base de datos
- ✅ `insert-test-data.js` - Configuración de base de datos
- ✅ `server.js` - URLs y puertos (ya usaba variables)
- ✅ `routes/googleAuth.js` - URLs (ya usaba variables)

### Docker
- ✅ `docker-compose.yml` - Puertos y URLs
- ✅ `docker/nginx.conf.example` - Configuración de nginx con variables

### Configuración
- ✅ `backend/process.env.example` - Agregada variable DB_SSL
- ✅ `docker.env.example` - Nuevo archivo para variables de Docker

## Seguridad

- ✅ **Nunca subir archivos .env a GitHub**
- ✅ **Usar variables de entorno para todas las credenciales**
- ✅ **Cambiar todas las claves secretas en producción**
- ✅ **Usar HTTPS en producción**
- ✅ **Eliminados todos los valores hardcodeados**

## Notas Importantes

- ✅ **Todas las URLs hardcodeadas han sido reemplazadas por variables de entorno**
- ✅ **Todas las claves secretas ahora se configuran desde variables de entorno**
- ✅ **El sistema es compatible con diferentes entornos (desarrollo, producción)**
- ✅ **Los archivos de prueba y configuración ahora usan variables de entorno**
- ✅ **Docker está configurado para usar variables de entorno** 