import express from "express";
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const app = express();
app.use(express.json());
const port= process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to DB...");
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
})

.catch((err) => {
    console.log(err);
})


