#!/bin/bash

echo "🚀 Iniciando el entorno Docker para el proyecto de Costos con Supabase..."

# Construir y levantar los contenedores
echo "📦 Construyendo y levantando contenedores..."
docker-compose up --build -d

# Esperar un momento para que la aplicación esté lista
echo "⏳ Esperando que la aplicación esté lista..."
sleep 5

# Verificar que los contenedores estén corriendo
echo "🔍 Verificando estado de los contenedores..."
docker-compose ps

echo ""
echo "✅ Entorno Docker iniciado correctamente!"
echo ""
echo "📋 Información del entorno:"
echo "   🌐 Backend API: http://localhost:3000"
echo "   ☁️  Base de datos: Supabase (remota)"
echo "   📊 Usuario de prueba: admin@test.com"
echo "   🔑 Contraseña: 1234"
echo ""
echo "📝 Comandos útiles:"
echo "   Ver logs: docker-compose logs -f"
echo "   Detener: docker-compose down"
echo "   Reiniciar: docker-compose restart"
echo "" 