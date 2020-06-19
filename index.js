const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const server = express();
const mongoose = require('mongoose')
const dotenv = require('dotenv')



const authRouter = require('./auth/auth-router');
const jokesRouter = require('./jokes/jokes-router');

dotenv.config()

mongoose.connect(process.env.DB_CONNECT,
{ useNewUrlParser: true,
  useUnifiedTopology: true },
()=> console.log('connect to db!'))

server.get('/',(req,res)=>{
  res.send('hello World')
})




//middle ware
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/jokes',  jokesRouter);









server.listen(3300,()=> console.log('server is running on 3300'));

