import express from 'express';
import { webhookEvent } from '../controllers/webhook';

const webhookRoutes = express.Router();

webhookRoutes.post('/webhook', webhookEvent);

export default webhookRoutes;
