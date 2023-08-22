"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkout_1 = __importDefault(require("./routes/checkout"));
require("dotenv/config");
const webhook_1 = __importDefault(require("./routes/webhook"));
const app = (0, express_1.default)();
const port = 5000;
app.use('/payments', checkout_1.default);
app.use('/payments', webhook_1.default);
app.get('/', (req, res) => {
    res.send('Hello, Express with TypeScript!');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
