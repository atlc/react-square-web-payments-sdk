import * as express from "express";
import checkoutRouter from "./checkout";

const app = express();

app.use(express.static("public"));
app.use(express.json());

app.use("/checkout", checkoutRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));
