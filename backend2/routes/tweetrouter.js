import express from 'express';
import tweet from '../models/tweet.model.js';
const router = express.Router();

router.post('/', async(req, res)=>{
    const {content,owner} = req.body;
    const newtweet = new tweet({content,owner});
    const newTweet = await newtweet.save();
    res.json(newTweet);
})

export default router;