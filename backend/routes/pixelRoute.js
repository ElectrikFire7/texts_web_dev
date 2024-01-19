import express from "express";
import { Pixel } from "../models/pixelModel.js";

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const pixels = await Pixel.find();
        return response.json(pixels);

    } catch (error) {
        console.log(error.message);
        return response.status(500).send(error.message);
    }
});

router.post("/", async (request, response) => {
    try {
        if (!request.body.row || !request.body.col || !request.body.r || !request.body.g || !request.body.b) {
            return response.status(400).send({ message: 'Send all required fields' });
        }

        const existingPixel = await Pixel.findOne({ row: request.body.row, col: request.body.col });

        if (existingPixel) {
            existingPixel.r = request.body.r;
            existingPixel.g = request.body.g;
            existingPixel.b = request.body.b;

            if (existingPixel.r > 255 || existingPixel.g > 255 || existingPixel.b > 255) {
                return response.status(400).send({ message: 'Bad authorization' });
            }

            const updatedPixel = await existingPixel.save();

            return response.status(200).send(updatedPixel);
        }

        const newPixel = {
            row: request.body.row,
            col: request.body.col,
            r: request.body.r,
            g: request.body.g,
            b: request.body.b,
        };

        if (newPixel.r > 255 || newPixel.g > 255 || newPixel.b > 255) {
            return response.status(401).send({ message: 'Bad query' });
        }

        const pixel = await Pixel.create(newPixel);

        return response.status(201).send(pixel);

    } catch (error) {
        console.log(error.message);
        return response.status(500).send(error.message);
    }
});


export default router;