import express from "express";
import User from "./models/User";
import bodyParser from "body-parser";

import usersRouter  from "./api/users/usersRouter";

//import mongoose from "mongoose";
//mongoose.connect("mongodb://animal505:vaca505@ds239930.mlab.com:39930/article-in");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/users", usersRouter);

export default app;
