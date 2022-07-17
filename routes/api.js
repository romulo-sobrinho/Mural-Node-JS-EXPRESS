const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const posts = require('../model/posts');
const cors = require('cors');

const options = {
  origin: 'http://localhost:3000'
}

router.use(cors(options));

router.get("/all", (req, res) => {
  res.json(JSON.stringify(posts.getAll()));
});

router.post("/new", bodyParser.json(), (req, res) => {
  let title = req.body.title;
  let description = req.body.description;

  posts.newPost(title, description);

  res.send("POST adicionado");
});

router.delete("/delete", bodyParser.json(), (req, res) => {
  let id = req.body.id;

  posts.deletePost(id);

  res.send("POST excluído");
});

router.put("/put", bodyParser.json(), (req, res) => {
  let id = req.body.id;
  let titleUpdate = req.body.titleUpdate;
  let descriptionUpdate = req.body.descriptionUpdate;

  posts.changePost(id, titleUpdate, descriptionUpdate);

  res.send("POST alterado");
});

module.exports = router;