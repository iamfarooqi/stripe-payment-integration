"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webhook_1 = require("../controllers/webhook");
const webhookRoutes = express_1.default.Router();
webhookRoutes.post('/webhook', webhook_1.webhookEvent);
exports.default = webhookRoutes;
