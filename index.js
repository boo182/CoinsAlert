import express, { Router } from "express";
import path from "path";
import { json, urlencoded } from "body-parser";
import cors from "cors";
require('dotenv').config();


const app = express();
const PORT = 1337;
app.use(cors());

import coins from "./routes/coins";
const router = Router();

// Body Parser is used to parse POST request body
app.use(json());
app.use(urlencoded({ extended: false }));

app.use('/coins', coins);

app.listen(PORT, () => {
    console.log('App running on port ' + PORT );
});