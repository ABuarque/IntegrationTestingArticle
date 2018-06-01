import express from "express";
import User from "../../models/User";

const router = express.Router();

router.get("/", (req, res, next) => {
    User.find({}).select("_id name email password").exec((err, user) => {
        if(err)
            return res.status(403).send({error: err});

        if(!user)
            return res.status(403).send({error: "User not found"});
        return res.status(200).json(user);
    });
});

router.get("/:id", (req, res, next) => {
    const givenId = req.params.id;
    if(!givenId)
        return res.status(422).send("Missing data");

    User.findById(givenId, (err, product) => {
        if(err)
            return next(err);
        res.send(product);
    });
});

router.post("/", (req, res, next) => {
    if( !req.body.password || !req.body.email)
        return res.status(422).send("Missing data");

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        favouriteColor: req.body.favouriteColor
    });

    user.save((err) => {
        if (err)
            return next(err);
        res.status(201).json(user);
    })
});

router.put("/:id", (req, res, next) => {
    const givenId = req.params.id;
    if(!givenId)
        return res.status(422).send("Missing data");

    User.findByIdAndUpdate(givenId, {$set: req.body}, (err, user) => {
        if (err)
            return next(err);
        res.status(200).send("Product udpated.");
    });
});

router.delete("/:id", (req, res, next) => {
    const givenId = req.params.id;
    if(!givenId)
        return res.status(422).send("Missing data");

    User.findByIdAndRemove(givenId,(error) => {
        if (err)
            return next(err);
        res.send("Deleted!");
    });
});

/*
{
    jobInfo: {
        position: CT,
        company
    },
    bands: {
        {

        }
    }
}
*/

router.post("/:id/history", async (req, res, next) => {
    const givenId = req.params.id;
    if(!givenId)
        return res.status(422).send("Missing data");

    User.findById(givenId, (error, user) => {
        if(error)
            return next(err);

        if(!user)
            return res.status(403).send({error: "User not found"});

        let userHistory = "";
        try {
            userHistory = getUserHistory(user, req.body);
        } catch(error) {
            return res.status(422).send("Cold not handle request");
        }
        return res.status(200).json({
                history: userHistory
        });
    });
});

const getUserHistory = (user, requestBody) => {
    return `${user.name} is ${requestBody.jobInfo.job} at ${requestBody.jobInfo.company}, his favourite color is ${user.favouriteColor} and his favourite bands are ${requestBody.favouriteBand1} and ${requestBody.favouriteBand2}`
}

export default router;
