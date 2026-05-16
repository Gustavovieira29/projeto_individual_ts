FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Recebe a URL do backend como argumento de build
ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
