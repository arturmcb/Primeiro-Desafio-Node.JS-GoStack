const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes : 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {url, title, techs} = request.body;

  const repositoryindex = repositories.findIndex(repository => repository.id === id);

  if (repositoryindex < 0) {
    return response.status(400).json({error : "Repositório não encontrado"})
  }

  repositories[repositoryindex].id = id;
  repositories[repositoryindex].url = url;
  repositories[repositoryindex].title = title;
  repositories[repositoryindex].techs = techs;

  return response.json(repositories[repositoryindex]);

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const repositoryindex = repositories.findIndex(repository => repository.id === id);

  if (repositoryindex < 0){
    return response.status(400).json({error:"Objeto não encontrado!"});
  }

  repositories.splice(repositoryindex,1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repositoryindex = repositories.findIndex(repository => repository.id === id);

  if (repositoryindex < 0){
    return response.status(400).json({error:"Objeto não encontrado!"});
  }

  const repository = repositories[repositoryindex];

  repository.likes +=1;

  return response.json(repository);
});

module.exports = app;
