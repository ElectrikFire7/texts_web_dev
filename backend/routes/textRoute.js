import express, { request, response } from "express";
import { Text } from "../models/textModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
    try {
        const newText = {
            sender: request.body.sender,
            content: request.body.content,
        };

        const text = await Text.create(newText);
        console.log("message dropped");

        return response.status(201).send(text);

    } catch (error) {
        console.log(error.message);
        return response.status(500).send(error.message);
    }
});

router.get("/", async (request, response) => {
    try {
        // Find the latest 10 entries, sorted by the creation date in descending order
        const latestTexts = await Text.find({})
          .sort({ createdAt: -1 }) // Sort in descending order based on creation date
          .limit(10);
    
        return response.json(latestTexts);
      } 
    
      catch (error) {
        console.error("Error fetching latest texts:", error.message);
        return response.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

export default router;