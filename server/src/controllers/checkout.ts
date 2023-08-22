import { Request, Response } from 'express';
import Stripe from 'stripe';
import 'dotenv/config';

const stripeConfig: Stripe.StripeConfig = {
  apiVersion: '2023-08-16',
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', stripeConfig);

export default async function checkOut(req: Request, res: Response) {
  if (req.method === 'POST') {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Apple Watch',
                images: [
                  'https://flowbite.com/docs/images/products/apple-watch.png',
                ],
              },
              unit_amount: 59999,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      });

      res.status(200).json({ sessionId: session.id });
    } catch (err) {
      res.status(500).json({ error: 'Error creating checkout session' });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
