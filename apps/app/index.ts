import express from 'express';
import dotenv from "dotenv";
import {prismaClient} from "db/client";
import { featureRouter } from './featureModule/feature';

const app = express();
dotenv.config({ path: "/.env" });
app.use(express.json())

app.get("/", (req,res) => {
    res.send("Hello World!");
})

app.use("/", featureRouter);

app.listen(3000, async () => {
    console.log("Server is running on port 3000");
})