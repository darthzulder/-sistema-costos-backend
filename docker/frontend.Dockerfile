# Usar la imagen oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Instalar dependencias del sistema
RUN apk add --no-cache python3 make g++

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Crear usuario no-root para seguridad
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
RUN chown -R nodejs:nodejs /app
USER nodejs

# Exponer el puerto
EXPOSE 3001

# Comando para ejecutar la aplicación en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 