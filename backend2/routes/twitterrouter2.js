import express  from "express";
const router = express.Router();
import tweetModel from "../models/tweet.model.js";

router.post("/", async(req, res) => {
const owner = req.body.owner;
 const tweets = await tweetModel.find({ owner: {$in:['65d8df92fb4a11b425918554','65d97fe505cfd56da37c3a1a','65d97ef7a0a24689b5f25494']}});
 res.json(tweets);
});
router.post('/forprofile',async(req, res) => {
    const owner = req.body.owner;
    const tweets = await tweetModel.find({ owner: owner});
    res.json(tweets);
})

export default router;