import express from "express";
import { Text } from "../models/textModel.js";

const router = express.Router();

router.post("/", async (request, response) => {
    try {
        if(!request.body.sender || !request.body.content){
            
            return response.status(400).send({ message: 'Send all required fields'})
        }
        
        const newText = {
            sender: request.body.sender,
            content: request.body.content,
        };

        const text = await Text.create(newText);
        console.log("message dropped");

        const textCount = await Text.countDocuments({});

        if (textCount > 20) {
            // Find the oldest text and remove it
            const oldestText = await Text.findOneAndDelete({}, { sort: { createdAt: 1 } });
            console.log("Deleted oldest text:", oldestText);
          }

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
          .limit(20);
    
        return response.json(latestTexts);
      } 
    
      catch (error) {
        console.error("Error fetching latest texts:", error.message);
        return response.status(500).json({ error: "Internal Server Error", message: error.message });
    }
});

export default router;