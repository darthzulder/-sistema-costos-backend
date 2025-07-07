#!/bin/bash

echo "🚀 Iniciando Sistema de Costos con Docker..."

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

# Construir e iniciar los servicios
echo "📦 Construyendo imágenes..."
docker-compose build

echo "🔄 Iniciando servicios..."
docker-compose up -d

# Esperar un momento para que los servicios se inicien
echo "⏳ Esperando que los servicios se inicien..."
sleep 10

# Verificar el estado de los servicios
echo "🔍 Verificando estado de los servicios..."
docker-compose ps

echo ""
echo "✅ Sistema iniciado correctamente!"
echo ""
echo "🌐 Acceso a la aplicación:"
echo "   Frontend: http://localhost"
echo "   Backend API: http://localhost/api"
echo "   Base de datos: localhost:5432"
echo ""
echo "📋 Comandos útiles:"
echo "   Ver logs: docker-compose logs -f"
echo "   Detener: docker-compose down"
echo "   Reiniciar: docker-compose restart"
echo "" 