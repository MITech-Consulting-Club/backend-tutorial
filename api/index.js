import express from 'express';
import cors from 'cors';
import { v4 as uuidV4 } from 'uuid';

const app = express();
app.use(express.json())
app.use(cors())

// Your code here

app.listen(8080);
