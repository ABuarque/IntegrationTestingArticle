import express from "express";
import User from "./models/User";
import mongoose from "mongoose";
import bodyParser from "body-parser";

mongoose.connect("mongodb://animal505:vaca505@ds239930.mlab.com:39930/article-in");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/:id", (req, res, next) => {
    const givenId = req.params.id;
    if(!givenId)
        return res.status(422).send("Missing some data");

    User.findById(givenId).select("_id email password")
    .exec((err, user) => {
        if(err)
            return res.status(403).send({error: err});
        if(!user)
            return res.status(403).send({error: "User not found"});
        return res.status(200).send({user});
    });
});

app.post("/", (req, res, next) => {
    if( !req.body.password || !req.body.email)
        return res.status(422).send("Missing some data");

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    user.save(err => {
        if(err)
            return res.status(403).send({"error": err});
        return res.status(201).send({
            user: user
        });
    });
});

export default app;
