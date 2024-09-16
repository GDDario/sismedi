FROM node:20.13.1-alpine

WORKDIR /app

# Copie o package.json e instale as dependências
COPY ../app/package.json .
RUN npm install

# Copie todos os arquivos do app
COPY ../app .

# Exponha a porta que o Vite usará
EXPOSE 5173

# Execute o servidor de desenvolvimento do Vite
CMD ["npm", "run", "dev", "--", "--host"]
