# 🐳 Guía de Docker para el Proyecto de Costos

Este proyecto está configurado para ejecutarse en Docker usando **Supabase** como base de datos en la nube.

## 📋 Requisitos Previos

- Docker Desktop instalado y ejecutándose
- Docker Compose (incluido en Docker Desktop)
- Conexión a internet (para acceder a Supabase)

## 🚀 Inicio Rápido

### Opción 1: Script Automático (Recomendado)
```bash
# En Windows PowerShell:
./docker-start.sh

# En Linux/Mac:
chmod +x docker-start.sh
./docker-start.sh
```

### Opción 2: Comandos Manuales
```bash
# Construir y levantar los contenedores
docker-compose up --build -d

# Verificar que estén corriendo
docker-compose ps
```

## 🌐 Acceso a la Aplicación

Una vez iniciado, puedes acceder a:

- **Backend API**: http://localhost:3000
- **Base de datos**: Supabase (remota)

## 👤 Datos de Prueba

Los datos de prueba deben estar ya configurados en tu proyecto Supabase. Si necesitas insertar datos de prueba, puedes usar los scripts en la carpeta `db/`:

```bash
# Ejecutar scripts de inserción de datos
node insert-test-data.js
# o
node seedTest.js
```

## 📝 Comandos Útiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs del backend
docker-compose logs -f backend

# Detener los contenedores
docker-compose down

# Reiniciar servicios
docker-compose restart

# Reconstruir después de cambios en el código
docker-compose up --build -d
```

## 🔧 Configuración

### Variables de Entorno
Las variables están configuradas en `docker-compose.yml`:

- `JWT_SECRET`: Clave para firmar tokens JWT
- `SUPABASE_URL`: URL de tu proyecto Supabase
- `SUPABASE_ANON_KEY`: Clave anónima de Supabase

### Puertos
- **3000**: Backend API

## ☁️ Supabase

El proyecto utiliza Supabase como base de datos en la nube, lo que significa:

- ✅ **No necesitas instalar PostgreSQL localmente**
- ✅ **Base de datos siempre disponible**
- ✅ **Backups automáticos**
- ✅ **Escalabilidad automática**
- ✅ **Panel de administración web**

### Configuración de Supabase
Asegúrate de que tu proyecto Supabase tenga las tablas necesarias. Puedes ejecutar los scripts SQL en el panel de Supabase:

1. Ve a tu proyecto en Supabase
2. Navega a SQL Editor
3. Ejecuta los scripts de `db/init/01-init.sql` para crear las tablas

## 🐛 Solución de Problemas

### El backend no puede conectarse a Supabase
```bash
# Verificar las variables de entorno
docker-compose logs backend

# Verificar que las credenciales de Supabase sean correctas
```

### Error de puerto ya en uso
```bash
# Verificar qué está usando el puerto
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Linux/Mac

# Cambiar puerto en docker-compose.yml si es necesario
```

### Reconstruir completamente
```bash
# Detener contenedores
docker-compose down

# Reconstruir desde cero
docker-compose up --build -d
```

## 📊 Monitoreo

```bash
# Ver uso de recursos
docker stats

# Ver información detallada de contenedores
docker-compose ps
```

## 🔄 Desarrollo

Para desarrollo, el código está montado como volumen, por lo que los cambios se reflejan automáticamente sin necesidad de reconstruir la imagen.

```bash
# Ver logs en tiempo real durante desarrollo
docker-compose logs -f backend
```

## 🗄️ Estructura de Base de Datos

El proyecto espera las siguientes tablas en Supabase:
- `Pais`: Países disponibles
- `Moneda`: Monedas disponibles
- `Usuario`: Usuarios del sistema
- `Empresa`: Empresas registradas
- `Rubro`: Rubros de negocio
- `Producto`: Productos de las empresas
- `Receta`: Recetas de productos
- `Materia_Prima`: Materias primas
- `Proveedor`: Proveedores
- `Licencia`: Licencias de usuarios 