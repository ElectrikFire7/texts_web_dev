import mongoose from "mongoose";

const pixelSchema = mongoose.Schema(
    {
        row:{
            type: Number,
            required: true,
        },
        col:{
            type: Number,
            required: true,
        },
        r:{
            type: Number,
            required: true,
        },
        g:{
            type: Number,
            required: true,
        },
        b:{
            type: Number,
            required: true,
        },
    }
)

export const Pixel = mongoose.model("Pixel", pixelSchema);