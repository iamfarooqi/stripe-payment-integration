import express from 'express';
import checkOut from '../controllers/checkout';

const paymentRoutes = express.Router();

paymentRoutes.post('/checkout', checkOut);

export default paymentRoutes;
