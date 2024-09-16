# Etapa de construcción
FROM node:18 AS build

WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar el código fuente y construir la aplicación
COPY . .
RUN npm run build --prod

# Etapa de producción
FROM nginx:alpine

# Copiar los archivos construidos desde la etapa de build
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]