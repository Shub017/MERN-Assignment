// Import express 
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import transactionRouter from './Transaction/transaction.router.js';
const app = express();

// Use the cors middleware
app.use(cors());

app.get('/', (req, res)=>{
    res.send( 'Welcome to server');
});

app.use('/transaction', transactionRouter);

export default app;