import "dotenv/config";
import express from "express";
import cors from "cors";
import prioritizeRouter from "./routes/prioritize.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Calendar Task Manager API is running."
    });
});

app.use("/api/prioritize", prioritizeRouter);

app.use((req, res) => {
    res.status(404).json({
        error: "Route not found."
    });
});

app.use((error, req, res, next) => {
    console.error(error);

    res.status(500).json({
        error: "Internal server error."
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
