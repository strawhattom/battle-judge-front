# Building the react app with vite
FROM node:18-alpine as frontend

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

RUN HUSKY=0 npm ci --only=production --ignore-scripts

COPY . .

RUN npm run build

# EXPOSE 4173

# CMD ["npm", "run", "preview"]

### Building using nginx server

FROM nginx:1.22.1-alpine as server

COPY --from=frontend /app/dist /usr/share/nginx/html
COPY --from=frontend /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
