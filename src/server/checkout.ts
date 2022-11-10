import * as express from "express";
import { Client, CreatePaymentRequest, Environment, Money } from "square";
import { TokenResult } from "@square/web-payments-sdk-types";
import { square } from "./config";
import { randomUUID } from "crypto";

const client = new Client({
    accessToken: square.accessToken,
    environment: Environment.Sandbox
});

const { paymentsApi } = client;

const router = express.Router();

interface CartItem {
    id: number;
    quantity: number;
    price: number;
}

router.post("/", async (req, res) => {
    const { sourceId, cart } = req.body as { sourceId: TokenResult; cart: CartItem[] };

    let sum = 0;

    cart.forEach(ci => {
        sum += ci.price * ci.quantity;
    });

    try {
        const body: CreatePaymentRequest = {
            sourceId: sourceId.token!,
            idempotencyKey: randomUUID(),
            amountMoney: { currency: "USD", amount: BigInt(sum * 100) }
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
