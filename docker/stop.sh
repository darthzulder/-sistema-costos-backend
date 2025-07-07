#!/bin/bash

echo "🛑 Deteniendo Sistema de Costos..."

# Detener y eliminar contenedores
docker-compose down

echo "🧹 Limpiando recursos..."
docker system prune -f

echo "✅ Sistema detenido correctamente!" 