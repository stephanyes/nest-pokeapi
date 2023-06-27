<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Pokemon API

## Dev deploy

1. Clone repository
2. Execute

```
npm run install
```

3. Have Nest CLI installed

```
npm i -g @nestjs/cli
```

4. Start database - check `docker-compose.yml` for database information

```
npm run docker:up
```

5. Clone **.env.example** to **.env**

6. Fill those env variables.

7. Run app with

```
npm run start:dev
```

8. Database seed

```
http://localhost:3000/api/v2/seed
```

## Stack implemented for this proyect

- MongoDB
- Nest

# Production Build

1. Create `.env.prod`
2. Add all variables needed for prod environment
3. Create new image running `npm run docker:build`
