import express from "express";
import User from "./models/User";
import bodyParser from "body-parser";

import usersRouter  from "./api/users/usersRouter";

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use("/users", usersRouter);

export default app;
