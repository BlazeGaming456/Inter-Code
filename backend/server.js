import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import codeRouter from './routes/codeRouter.js';

const PORT = process.env.PORT || 5000;

const app = express();

// CORS Middleware must come FIRST
const corsOptions = {
  origin: [
    'https://inter-code-frontend.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Other middleware
app.use(express.json());

// Routes
app.use('/code', codeRouter);

// Test route
app.get('/', (req, res) => {
  res.json({ 
    status: 'API is running',
    cors: 'Configured for localhost:5173'
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});