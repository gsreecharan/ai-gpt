import express from "express";
import Thread from "../models/Thread.js";
import getOpenAIAPIResponse from "../utils/openai.js";
const router = express.Router();

//test

router.post("/test" , async (req, res) => {
    try{
        const thread= new Thread({
            threadId: "abcd",
            title: "Testing New Thread_2"
        });

        const response = await thread.save();
        res.send(response);
    }catch(err){
        console.log(err);
        res.status(500).json({error: "failed to save in db"});
    }
});

// Get All Threads
router.get("/thread" , async(req, res) => {
    try{
        const threads = await Thread.find({}).sort({updatedAt: -1});
        //Descending order of updatedAt..Most recent on top
        return res.json(threads);
    }catch(err){
        console.log(err);
        return res.status(500).json({error: "failed to fetch threads"});
    }
});

router.get("/thread/:threadId" , async(req, res) => {
    const {threadId} = req.params;

    try{
        const thread = await Thread.findOne({threadId});

        if(!thread) {
            return res.status(404).json({error: "Thread not found"});
        }

        return res.json(thread.messages)

    }catch(err){
        console.log(err);
        return res.status(500).json({error: "Failed to fetch"});
    }
});

router.delete("/thread/:threadId", async(req , res) => {
    const {threadId} = req.params;
    try{
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if(!deletedThread) {
            return res.status(404).json({error: "Thread not found"});
        }
        return res.status(200).json({success: "Thread deleted successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to delete thread"});
    }
});

router.post("/chat" , async(req, res) => {
    const {threadId, message} = req.body;

    if(!threadId || !message) {
        return res.status(400).json({error: "Missing Required Filed"});
    }

    try {
        let thread = await Thread.findOne({threadId});

        if(!thread) {
            //Create a new thread in db
            thread = new Thread({
                threadId,
                title: message.length > 28 ? message.slice(0, 28) + "..." : message,
                messages: [{role: "user" , content: message}]
            });
        }else{
            thread.messages.push({role: "user" , content: message});
        }

        const assistantReply = await getOpenAIAPIResponse(message);
        
        thread.messages.push({role: "assistant" , content:assistantReply});
        thread.updatedAt = new Date();

        await thread.save();
        return res.json({reply: assistantReply});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "something went wrong"});
    }
});

export default router;