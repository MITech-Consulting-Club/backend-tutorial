import express from 'express';
import cors from 'cors';
import { v4 as uuidV4 } from 'uuid';

const app = express();
app.use(express.json())
app.use(cors())

// Create an in-memory database that stores a collect of todos with a unique `id` and a potentially non-unique `title`
// hint: what's a good way to store a *list* of *key-value* pairs (wink wink)

// Your code here

// Here's a freebie handler that doesn't do all that much, but it's trying its best
app.get('/', (req, res) => {
    res.send('Hiya :)');
});

// Handles: A GET request sent to localhost:8080/about
// Responds With: The number of todos currently in memory

// Your code here

// Handles: A GET request sent to localhost:8080/todos
// Responds With: All todos currently in memory

// Your code here

// Handles: A POST request sent to localhost:8080/todo
// Does: Appends a new todo to the database with the `title` key from the request body `req.body`

// Your code here

// Handles: A DELETE request sent to localhost:8080/todo
// Does: Deletes a todo from the database matching the `id` property specified in the request body (req.body)


app.listen(8080);
