# Docker - Sistema de Costos

Esta carpeta contiene toda la configuración Docker para el Sistema de Costos.

## 📁 Estructura

```
docker/
├── backend.Dockerfile      # Dockerfile para el backend
├── frontend.Dockerfile     # Dockerfile para el frontend
├── nginx.conf             # Configuración de Nginx
├── start.sh               # Script para iniciar todo
├── stop.sh                # Script para detener todo
├── logs.sh                # Script para ver logs
├── dev.sh                 # Script para desarrollo
└── README.md              # Esta documentación
```

## 🚀 Comandos Rápidos

### Iniciar todo el sistema
```bash
# En Linux/macOS
./docker/start.sh

# En Windows
docker-compose up -d
```

### Modo desarrollo (con logs)
```bash
# En Linux/macOS
./docker/dev.sh

# En Windows
docker-compose up
```

### Ver logs
```bash
# En Linux/macOS
./docker/logs.sh

# En Windows
docker-compose logs -f
```

### Detener todo
```bash
# En Linux/macOS
./docker/stop.sh

# En Windows
docker-compose down
```

## 🐳 Servicios

### Backend (Node.js)
- **Puerto:** 3000
- **Imagen:** `sistema-costos-backend`
- **Contexto:** `./backend`
- **Comando:** `npm run dev`

### Frontend (React)
- **Puerto:** 3001
- **Imagen:** `sistema-costos-frontend`
- **Contexto:** `./frontend`
- **Comando:** `npm run dev`

### Base de Datos (PostgreSQL)
- **Puerto:** 5432
- **Imagen:** `postgres:15-alpine`
- **Base de datos:** `costos_db`
- **Usuario:** `postgres`
- **Contraseña:** `postgres123`

### Proxy (Nginx)
- **Puerto:** 80
- **Imagen:** `nginx:alpine`
- **Función:** Proxy reverso

## 🔧 Configuración

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

### Volúmenes
- `./backend:/app` - Código del backend
- `./frontend:/app` - Código del frontend
- `postgres_data:/var/lib/postgresql/data` - Datos de PostgreSQL

### Redes
- `costos_network` - Red interna para comunicación entre servicios

## 🛠️ Desarrollo

### Hot Reload
Los volúmenes están configurados para hot reload:
- Cambios en el código se reflejan automáticamente
- No es necesario reconstruir las imágenes

### Debugging
```bash
# Entrar al contenedor del backend
docker-compose exec backend sh

# Entrar al contenedor del frontend
docker-compose exec frontend sh

# Ver logs de un servicio específico
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Reconstruir imágenes
```bash
# Reconstruir todo
docker-compose build --no-cache

# Reconstruir solo backend
docker-compose build backend

# Reconstruir solo frontend
docker-compose build frontend
```

## 🔍 Troubleshooting

### Problemas comunes

1. **Puertos ocupados**
   ```bash
   # Ver qué está usando el puerto
   netstat -tulpn | grep :3000
   
   # Cambiar puertos en docker-compose.yml
   ```

2. **Permisos de archivos**
   ```bash
   # En Linux/macOS
   chmod +x docker/*.sh
   ```

3. **Volúmenes corruptos**
   ```bash
   # Eliminar volúmenes
   docker-compose down -v
   docker volume prune
   ```

4. **Imágenes desactualizadas**
   ```bash
   # Limpiar todo
   docker-compose down
   docker system prune -a
   docker-compose build --no-cache
   ```

### Logs útiles
```bash
# Ver logs de todos los servicios
docker-compose logs

# Ver logs de un servicio específico
docker-compose logs backend
docker-compose logs frontend
docker-compose logs postgres
docker-compose logs nginx

# Seguir logs en tiempo real
docker-compose logs -f
```

## 📊 Monitoreo

### Health Checks
- **Backend:** http://localhost/api/health
- **Frontend:** http://localhost
- **Base de datos:** Verificar logs de PostgreSQL

### Métricas
```bash
# Uso de recursos
docker stats

# Espacio en disco
docker system df
```

## 🔒 Seguridad

- Usuarios no-root en contenedores
- Variables de entorno para secretos
- Redes aisladas
- Volúmenes con permisos apropiados

## 🚀 Producción

Para producción, considera:
- Usar imágenes optimizadas
- Configurar SSL/TLS
- Implementar health checks
- Configurar backups de base de datos
- Usar secrets management
- Configurar logging centralizado 