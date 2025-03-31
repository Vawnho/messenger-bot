import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080; // Đổi mặc định thành 4000
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.use(express.json());

// Endpoint xác minh Webhook với Facebook
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
        console.log("WEBHOOK VERIFIED");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

// Endpoint xử lý tin nhắn từ Messenger
app.post("/webhook", (req, res) => {
    console.log("Received event:", req.body);
    res.sendStatus(200);
});

// Chạy server trên cổng 4000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
