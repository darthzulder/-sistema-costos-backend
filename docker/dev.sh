#!/bin/bash

echo "🔧 Iniciando entorno de desarrollo..."

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker no está instalado. Por favor instala Docker primero."
    exit 1
fi

# Verificar si Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose no está instalado. Por favor instala Docker Compose primero."
    exit 1
fi

# Construir e iniciar los servicios en modo desarrollo
echo "📦 Construyendo imágenes de desarrollo..."
docker-compose build

echo "🔄 Iniciando servicios en modo desarrollo..."
docker-compose up

echo ""
echo "✅ Entorno de desarrollo iniciado!"
echo ""
echo "🌐 Acceso a la aplicación:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost/api"
echo "   Base de datos: localhost:5432"
echo ""
echo "📋 Comandos útiles:"
echo "   Ver logs: docker-compose logs -f"
echo "   Detener: Ctrl+C o docker-compose down"
echo "   Reconstruir: docker-compose build --no-cache"
echo "" 