# Install dependencies only when needed
FROM node:18-alpine3.16 AS deps

RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Build the app with cache dependencies
FROM node:18-alpine3.16 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM node:18-alpine3.16 AS runner
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install --prod
COPY --from=builder /app/dist ./dist

# Copy directory and its contents
# RUN mkdir -p ./pokedex

# COPY --from=builder ./app/dist ./app
# COPY ./.env ./app/.env

# # Give access to the application
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser /var/www/pokedex
# USER pokeuser

CMD [ "node", "dist/main" ]


####################################################################################################################################################



# First attempt of Dockerizing my app
# # BUILDX
# # Alpine is a version of Linux super light
# FROM node:18-alpine3.16

# # Set working directory
# RUN mkdir -p /var/www/pokedex
# WORKDIR /var/www/pokedex

# # Copy directory and its contents
# COPY . ./var/www/pokedex
# COPY package.json tsconfig.json tsconfig.build.json /var/www/pokedex/

# # Installing prod dependencies
# RUN npm install --prod 
# RUN npm build

# # Give access to the application
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser /var/www/pokedex
# USER pokeuser

# # Clean cache
# RUN npm cache clean --force

# # Port
# EXPOSE 3005

# # Command
# CMD [ "npm", "run", "start:prod" ]