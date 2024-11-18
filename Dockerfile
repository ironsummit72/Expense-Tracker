FROM node:21.1.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm i -g typescript
COPY . .

ENV VITE_BACKEND_URL=/api
RUN npm install 
RUN npm run build


FROM nginx:latest 
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]




