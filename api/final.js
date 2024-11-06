import express from 'express';
import cors from 'cors';
import { v4 as uuidV4 } from 'uuid';

const app = express();
app.use(express.json())
app.use(cors())

let todos = [
  {
    title: "Clean your room",
    id: 'ca425dd4-55a0-4ed2-80a0-e89cf00c2019',
  },
];

app.get('/', (req, res) => {
  res.send('MITech Todos API');
});

app.get('/about', (req, res) => {
  res.json({'current todos': todos.length});
});

app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todo', (req, res) => {
  console.log(req.body)
  todos.push({
    title: req.body.title,
    id: uuidV4(),
  });
  res.status(200).send("okie");
})

app.delete('/todo', (req, res) => {
  todos = todos.filter(todo => todo.id != req.body.id)
  console.log(req.body)
    res.status(200).send('okie');
})

app.listen(8080);
