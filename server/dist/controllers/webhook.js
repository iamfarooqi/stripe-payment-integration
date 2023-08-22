"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookEvent = void 0;
const stripe_1 = __importDefault(require("stripe"));
const micro_1 = require("micro");
const stripeConfig = {
    apiVersion: '2023-08-16',
};
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', stripeConfig);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
function webhookEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sig = req.headers['stripe-signature'];
        if (sig === undefined) {
            return res.status(400).send('Stripe signature header is missing.');
        }
        const buf = yield (0, micro_1.buffer)(req);
        let event;
        if (!webhookSecret) {
            console.error('Stripe webhook secret is missing.');
            return res.status(400).send('Stripe webhook secret is missing.');
        }
        try {
            event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret);
        }
        catch (err) {
            console.error(`Webhook signature verification failed: ${err.message}`);
            return res
                .status(400)
                .send(`Webhook signature verification failed: ${err.message}`);
        }
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
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
    });
}
exports.webhookEvent = webhookEvent;
