import express from "express";
import User from "../../models/User";

const router = express.Router();

router.get("/", (req, res, next) => {
    User.find({}).select("_id email password").exec((err, user) => {
        if(err)
            return res.status(403).send({error: err});
        if(!user)
            return res.status(403).send({error: "User not found"});
        return res.status(200).send(user);
    });
});

router.get("/:id", (req, res, next) => {
    const givenId = req.params.id;
    if(!givenId)
        return res.status(422).send("Missing some data");

    User.findById(givenId, (err, product) => {
        if(err)
            return next(err);
        res.send(product);
    });
});

router.post("/", (req, res, next) => {
    if( !req.body.password || !req.body.email)
        return res.status(422).send("Missing some data");

    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    try {
        user.save();
        return res.status(201).json({user : user});
    } catch(error) {
        return res.status(403).send({"error": error})
    }
});

router.put("/:id", (req, res, next) => {
    const givenId = req.params.id;
    if(!givenId)
        return res.status(422).send("Missing some data");
    User.findByIdAndUpdate(givenId, {$set: req.body}, (err, product) => {
        if (err) return next(err);
           res.send('Product udpated.');
    });
});

router.delete("/:id", (req, res, next) => {
    const givenId = req.params.id;
    if(!givenId)
        return res.status(422).send("Missing some data");
    User.findByIdAndRemove(givenId,(error) => {
        if (err)
            return next(err);
        res.send('Deleted successfully!');
    });
});

router.get("/:id/history", async (req, res, next) => {
    const givenId = req.params.id;
    if(!givenId)
        return res.status(422).send("Missing some data");
    try {
        const user = await User.findById(givenId);
        res.status(200).json({
            history: `${user.email} is viado`
        });
    } catch (e) {
        res.status(500).json({error: e});
    }
});

export default router;
