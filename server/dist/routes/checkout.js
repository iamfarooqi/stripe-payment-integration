"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkout_1 = __importDefault(require("../controllers/checkout"));
const paymentRoutes = express_1.default.Router();
paymentRoutes.post('/checkout', checkout_1.default);
exports.default = paymentRoutes;
