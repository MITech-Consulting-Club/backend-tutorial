// Express is the "engine" of the API, handling the routing, handling, and response sending
import express from 'express';
// An optional library to prevent CORS errors (not relavent to this tutorial, but worth a Google)
import cors from 'cors';
// UUID is a protocol for generating truly "unique" ids. Very overkill for the tutorial, but you'll see it
// again if you continue to do web dev
import { v4 as uuidV4 } from 'uuid';

// Create an instance of the Express API "engine"
const app = express();
// Parse the content of request bodies from JSON "purely text" to an object accessible in handlers via req.body
app.use(express.json())
// Do the CORS thing
app.use(cors())

// Our in-memory "database" for this tutorial. "Real" systems would use a less ephemeral system, as this resets
// whenever the app is restarted (test this).
let todos = [
  {
    title: "Clean your room", // Explanatory
    id: 'ca425dd4-55a0-4ed2-80a0-e89cf00c2019', // Needs to be unique for the creation/deletion operations to work
  },
];

// The following are a series of router handlers
// They each correspond to a particular path and HTTP verb (https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
// The method called corresponds to the verb (app.get, app.post, app.put, etc...)
// The first parameter corresponds to the path; note that the absence of a path (eg. google.com) corresponds to '/'
// The second parameter takes a function to handle the request if the route "matches" the path you specified
  // I use arrow notation (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
  // but you could also use function notation (either inline or by defining a function elsewhere)
  // It gets passed two parameters, the request (req) and response (res) instances, both containing usefull methods and properties
  // `req` contains the body (usefull for intaking custom data) and details about the user (client info, IP addr, etc)
  // `res` contains methods for responding to the user including `res.send` and `res.json`

// Handles: A GET request sent to localhost:8080
// Responds With: A simple message :)
app.get('/', (req, res) => {
  // `res.send` can be used to send any variety of data, but often less usefull than it's res.json counterpart in production
  res.send('MITech Todos API');
  // Anything below here wouldn't run, as calling one of the many response functions terminates the rest of the handler
});

// Handles: A GET request sent to localhost:8080/about
// Responds With: The number of todos currently in memory
app.get('/about', (req, res) => {
  // Notices this uses `res.json`, which sends more "structured" data, which is usally much more efficient for non-human clients (eg. mobile apps, SPAs)
  // This would look like `{"current todos": 1}`
  res.json({'current todos': todos.length});
});

// Handles: A GET request sent to localhost:8080/todos
// Responds With: All todos currently in memory
app.get('/todos', (req, res) => {
  // This would look like `[ {"title": "hi", "id": "42069"} ]`
  res.json(todos);
});

// Handles: A POST request sent to localhost:8080/todo
// Does: Appends a new todo to the database
app.post('/todo', (req, res) => {
  // Pushes a new item to the database (once again, this would normally be a call to postgres, mysql, etc)
  todos.push({
    title: req.body.title,
    id: uuidV4(),
  });

  // Specifies to the browser that everything worked out (code: 200) before sending a simple message for any human viewers (rare irl)
  res.status(200).send("okie");
})

// Handles: A DELETE request sent to localhost:8080/todo
// Does: Deletes a todo from the database matching the `id` property specified in the request body (req.body)
app.delete('/todo', (req, res) => {
  todos = todos.filter(todo => todo.id != req.body.id)
  console.log(req.body);
  res.status(200).send('okie');
})

app.listen(8080);
