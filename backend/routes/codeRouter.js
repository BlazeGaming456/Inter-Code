import express from 'express';
import { codeTranslate, codeGeneration, codeExplanation } from '../controllers/codeController.js';

const codeRouter = express.Router();

codeRouter.post('/convert',codeTranslate);
codeRouter.post('/generate',codeGeneration);
codeRouter.post('/explain',codeExplanation);

export default codeRouter;