import mongoose from "mongoose";
import { type } from "node:os";
import { describe } from "node:test";

const ProductsSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    manager: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['for sale', 'sold out'],
        default: 'for sale',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Products', ProductsSchema);