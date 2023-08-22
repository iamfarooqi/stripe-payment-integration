import { Request, Response } from 'express';
import Stripe from 'stripe';
import { buffer } from 'micro';

const stripeConfig: Stripe.StripeConfig = {
  apiVersion: '2023-08-16',
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', stripeConfig);

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function webhookEvent(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string | undefined;

  if (sig === undefined) {
    return res.status(400).send('Stripe signature header is missing.');
  }

  const buf = await buffer(req);

  let event;
  if (!webhookSecret) {
    console.error('Stripe webhook secret is missing.');
    return res.status(400).send('Stripe webhook secret is missing.');
  }
  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return res
      .status(400)
      .send(`Webhook signature verification failed: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log(`Payment successful for session ID: ${session.id}`);
      // Handle post-payment actions here
      break;

    // Add other event types to handle as needed

    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  if (event.type === 'charge.succeeded') {
    console.log(event.data.object, 'event>>');

    res.status(200).json({ sessionId: event.data.object });
  }

  res.status(200).end();
}
