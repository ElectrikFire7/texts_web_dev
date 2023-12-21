import mongoose from "mongoose";

const textSchema = mongoose.Schema(
    {
        sender: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

textSchema.index({ createdAt: -1 });

export const Text = mongoose.model("Text", textSchema);