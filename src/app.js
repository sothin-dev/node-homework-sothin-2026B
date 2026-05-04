import express from "express";
import userRouter from "./routes/userRouters.js";
import productRouter from "./routes/productRouters.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(userRouter);
app.use(productRouter);
app.use("/api", userRouter);
app.use("/api", productRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
