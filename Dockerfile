# Qual é a imagem base vou usar / alpine - Versão reduzida do linux que só tem somente o necessário
FROM node:22-alpine AS builder

# Cria uma pasta no linux que todo comando que executar é como se tivesse dentro dessa pasta '/app'
WORKDIR /app
 
# Copia todo o projeto para dentro da pasta '/app' porém será ignorados os arquivos listados dentro do arquivo '.dockerignore'
COPY . ./

# npm ci - Instala exatamente as dependências como estão salvas no package.lock, ele nunca irá mudá-lo(cache), não vai atualizar as libs, só vai instalar, diferente do 'npm install' ou 'npm i'
# --only=production - Só vai instalar somente as dependências de produção
RUN npm ci --only=production

# Nosso app roda na porta 3333
EXPOSE 3333

# Comando para rodar o app
CMD ["node", "src/server.ts"]

# docker build . - Irá fazer a imagem do nosso servidor como imagem no docker


