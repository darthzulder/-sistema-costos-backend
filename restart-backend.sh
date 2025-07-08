#!/bin/bash

echo "🔄 Reiniciando backend con configuración limpia..."

# Parar el backend
docker-compose stop backend

# Eliminar el contenedor del backend
docker-compose rm -f backend

# Rebuildear solo el backend
docker-compose build backend

# Iniciar el backend
docker-compose up backend

echo "✅ Backend reiniciado correctamente" 