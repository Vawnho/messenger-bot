require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint xác minh Webhook với Facebook
app.get("/webhook", (req, res) => {
    const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === VERIFY_TOKEN) {
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

// Chạy server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
