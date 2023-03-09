# Building the react app with vite
FROM node:18-alpine as frontend

ENV NODE_ENV=production

WORKDIR /app

COPY package*.json ./

# RUN apk add --no-cache xdg-utils

RUN HUSKY=0 npm ci --only=production --ignore-scripts
# RUN npm pkg delete scripts.prepare
# RUN HUSKY=0 npm i --ignore-scripts

COPY . .

# EXPOSE 5173

# CMD ["npm", "run", "dev"]

RUN npm run build

EXPOSE 4173

CMD ["npm", "run", "preview"]

# Building using nginx server
# FROM nginx:1.22.1-alpine as server

# COPY --from=frontend /app/build /usr/share/nginx/html
# COPY --from=frontend /app/nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
