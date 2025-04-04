import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import codeRouter from './routes/codeRouter.js';

const PORT = process.env.PORT || 4000;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/code',codeRouter);
app.options('*',cors);

app.get('/', (req, res) => {
    res.json({ 
      status: 'API is running'
    });
  });

app.listen(PORT,()=>{
    console.log(`Server is listening at PORT ${PORT}`);
})