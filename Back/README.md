# encurtador-url

This is encurtador-url that uses [simple-node-framework](https://github.com/diogolmenezes/simple-node-framework), [write your application description here]

## Tasks

| Task      | Description            |
| --------- | ---------------------- |
| npm start | starts the application |
| npm test  | run tests              |

rodar o compose up para subir o banco de dados mongo

# Encurtador de URL (estilo bitly) - [bitly](https://bitly.com/)

### GET /{uuid}

```js
//GET
// http://localhost:8080/qyzrtwptgj

//RESPONSE
// http://google.com
```

### POST /generate

```js
//POST
body = {
  url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.cloudflare.steamstatic.com%2Fsteam%2Fapps%2F1092300%2Fss_d6d81ad77f40ab58aaf7f636f9b4fadefc658b94.1920x1080.jpg%3Ft%3D1577170099&imgrefurl=https%3A%2F%2Fstore.steampowered.com%2Fapp%2F1092300%2FDrone_Racer%2F%3Fl%3Dbrazilian&tbnid=iycFgSi3GX2-bM&vet=12ahUKEwjQ17De_uL8AhVrLLkGHYgAA2YQMygsegUIARCxAw..i&docid=2_FsbHDUb66p5M&w=1920&h=1080&itg=1&q=drone%20racer&ved=2ahUKEwjQ17De_uL8AhVrLLkGHYgAA2YQMygsegUIARCxAw'
}

//Ex. response
body = {
  url: 'http://localhost:8080/qyzrtwptgj'
}
```

### PUT /{uuid}

```js
//put
// www.google.com

//Ex. response
body = {
  fullURL:
    'https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.cloudflare.steamstatic.com%2Fsteam%2Fapps%2F1092300%2Fss_d6d81ad77f40ab58aaf7f636f9b4fadefc658b94.1920x1080.jpg%3Ft%3D1577170099&imgrefurl=https%3A%2F%2Fstore.steampowered.com%2Fapp%2F1092300%2FDrone_Racer%2F%3Fl%3Dbrazilian&tbnid=iycFgSi3GX2-bM&vet=12ahUKEwjQ17De_uL8AhVrLLkGHYgAA2YQMygsegUIARCxAw..i&docid=2_FsbHDUb66p5M&w=1920&h=1080&itg=1&q=drone%20racer&ved=2ahUKEwjQ17De_uL8AhVrLLkGHYgAA2YQMygsegUIARCxAw',
  shortURL: 'http://localhost:8080/qyzrtwptgj'
}
```

### del /{uuid}

```js
//del
// http://localhost:8080/qyzrtwptgj

//RESPONSE
// {}
```
