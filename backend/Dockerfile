FROM node:21.1.0 AS build
WORKDIR /build
COPY package*.json ./
RUN npm i -g typescript
COPY . .
ENV VITE_BACKEND_URL=/api
RUN npm install
RUN npm run build

FROM node:21.1.0
WORKDIR /app
COPY package*.json ./
COPY --from=build /build/dist /app/dist
RUN npm install
EXPOSE 3000
ENV JWT_SECRET=secret
ENV DB_URL=mongodb://test
ENV DB_NAME=expensetracker
CMD ["node", "dist/index.js"]
