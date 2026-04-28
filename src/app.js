import express from "express";
import router from "./routes/userRouters.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);
app.use("/api", router);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
