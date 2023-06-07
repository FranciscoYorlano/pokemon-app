# Pokemon Cards App

### Pokemon cards app para el proyecto indivudual para la carrera Full Stack de [Henry](https://www.soyhenry.com/)

## Features

-   ✅ Busqueda de pokemons por nombre
-   ✅ Filtros, ordenes y paginado de pokemon cards
-   ✅ Sign in, Sign up y collección de pokemons para users
-   ✅ Creación de nuevos pokemons
-   ✅ Detalle de pokemons

## Ejecutar en entorno local

### Requisitos

1. Instalar PostgreSQL
2. Crear una base de datos con nombre "pokemon"
3. Forkea este repositorio y clonalo en tu pc

### Instalación

4. En ./api de este repositorio crear un archivo llamado ".env" y agregar lo siguiente:

```bash
DB_USER=yourPostgresUser
DB_PASSWORD=yourPostgresPassword
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pokemon

EXT_API_URL=https://pokeapi.co/api/v2
```

5. En ./client/src/config.js cambia el valor de la constante NACKEND_BASE_URI por el siguiente:

```js
export const BACKEND_BASE_URI = "http://localhost:3001";
```

6. Ya podes ejecutar los siguiente comandos dentro de cada uno de los siguien tes directorios:

```bash
# ./api
npm start

# ./client
npm start
```

7. En el navegador dirigite a: http://localhost:3000/ y disfruta!

## Screenshots

![Home](https://media.licdn.com/dms/image/D4D22AQHLvvhVCeKPQg/feedshare-shrink_2048_1536/0/1682795030128?e=1689206400&v=beta&t=vEBMS3rmknUqtBwwdeld0k7fCcdG-atL-FZcpa1F8e4)

![Detail](https://i.postimg.cc/xC6w9nPj/pokemon-cards-fy-vercel-app-home-1.png)

![Create](https://i.postimg.cc/gcNz0P0Z/pokemon-cards-fy-vercel-app-create.png)

![SignIn](https://media.licdn.com/dms/image/D4D22AQGawxrBGLwSEQ/feedshare-shrink_2048_1536/0/1682795028296?e=1689206400&v=beta&t=uX1sAwwWTWuS5CtuaS7BCoVHMw29xo0jYQH_aCTmyPI)

## Links

-   [App](https://pokemon-francisco-yorlano.vercel.app/)
-   [LinkedIn Post](https://www.linkedin.com/feed/update/urn:li:activity:7058153932753186816/)

## Authors

[@franciscoyorlano](https://www.github.com/franciscoyorlano)

## Tech Stack

### Frontend

<div align="">  
<a href="https://reactjs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/react-original-wordmark.svg" alt="React" height="50" /></a>  
<a href="https://www.w3schools.com/css/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/css3-original-wordmark.svg" alt="CSS3" height="50" /></a>  
<a href="https://www.javascript.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/javascript-original.svg" alt="JavaScript" height="50" /></a>  
<a href="https://redux.js.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/redux-original.svg" alt="Redux" height="50" /></a>  
</div>

### Backend

<div align="">  
<a href="https://nodejs.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/nodejs-original-wordmark.svg" alt="Node.js" height="50" /></a>  
<a href="https://expressjs.com/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/express-original-wordmark.svg" alt="Express.js" height="50" /></a>  
<a href="https://www.postgresql.org/" target="_blank"><img style="margin: 10px" src="https://profilinator.rishav.dev/skills-assets/postgresql-original-wordmark.svg" alt="PostgreSQL" height="50" /></a>  
</div>
