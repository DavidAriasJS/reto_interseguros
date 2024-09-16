# Usar la imagen oficial de Node.js
FROM node:18

WORKDIR /app

# Copiar archivos de package.json e instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto de la API
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]