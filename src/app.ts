import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();
const port = 5000;

mongoose
    .connect("mongodb://localhost:27017/mydatabase", {})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

// Basic route for testing
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
