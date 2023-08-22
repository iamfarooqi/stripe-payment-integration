import express from 'express';
import paymentRoutes from './routes/checkout';
import 'dotenv/config';
import webhookRoutes from './routes/webhook';

const app = express();
const port = 5000;

app.use('/payments', paymentRoutes);
app.use('/payments', webhookRoutes);

app.get('/', (req, res) => {
  res.send('Hello, Express with TypeScript!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
