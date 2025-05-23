FROM node:18-alpine AS builder
WORKDIR /app


# copiar el código y crear la versión de producción
COPY . .
RUN npm install

RUN npm run build        # genera /app/dist

# 2) Production stage con Nginx
FROM nginx:alpine
# elimina el sitio por defecto de Nginx
RUN rm -rf /usr/share/nginx/html/*
# copia el build de Vite
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
