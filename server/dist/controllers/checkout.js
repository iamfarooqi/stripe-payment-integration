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
const stripe_1 = __importDefault(require("stripe"));
require("dotenv/config");
const stripeConfig = {
    apiVersion: '2023-08-16',
};
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || '', stripeConfig);
function checkOut(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method === 'POST') {
            try {
                const session = yield stripe.checkout.sessions.create({
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
            }
            catch (err) {
                res.status(500).json({ error: 'Error creating checkout session' });
            }
        }
        else {
            res.setHeader('Allow', 'POST');
            res.status(405).end('Method Not Allowed');
        }
    });
}
exports.default = checkOut;
