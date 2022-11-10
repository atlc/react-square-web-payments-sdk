import * as express from "express";
import { Client, CreatePaymentRequest, Environment, Payment } from "square";
import { square } from "./config";
import { randomUUID } from "crypto";

const client = new Client({
    accessToken: square.accessToken,
    environment: Environment.Sandbox
});

const { paymentsApi } = client;

const router = express.Router();

router.post("/", async (req, res) => {
    const { sourceId } = req.body;

    const total = 22.5; // generated from DB logic

    try {
        const body: CreatePaymentRequest = {
            sourceId,
            idempotencyKey: randomUUID(),
            amountMoney: { amount: BigInt(total * 100) }
        };

        const lol = await paymentsApi.createPayment(body);
        const url = lol.result.payment?.receiptUrl;

        res.status(200).json({ message: "Noice, we did it. Gotta loicense for that payment processor, do ya?", url });
    } catch (error) {
        res.status(500).json({ message: "Ah I can't believe you've done this" });
        console.log(error);
    }
});

export default router;
