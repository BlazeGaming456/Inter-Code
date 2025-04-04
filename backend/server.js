import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import codeRouter from './routes/codeRouter.js';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());

app.use('/code',codeRouter);

const corsOptions = {
  origin: [
    'https://inter-code-frontend.vercel.app', // Your frontend URL
    'http://localhost:3000' // For local testing
  ],
  methods: ['GET', 'POST', 'OPTIONS'], // Include OPTIONS for preflight
  allowedHeaders: ['Content-Type'],
  credentials: true // If using cookies/auth
};
app.use(cors(corsOptions)); // Apply CORS middleware
app.options('*', cors()); // Enable preflight for all routes

app.get('/', (req, res) => {
    res.json({ 
      status: 'API is running'
    });
  });

app.listen(PORT,()=>{
    console.log(`Server is listening at PORT ${PORT}`);
})