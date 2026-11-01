// import { GoogleGenAI } from "@google/genai";
// import 'dotenv/config';
 
// const ai = new GoogleGenAI({
//     apiKey: process.env.GEMINI_API_KEY,
// });

// // 1. Wrap the API call in a try/catch block
// try {
//     console.log("Connecting to Gemini AI...");
    
//     const interaction = await ai.interactions.create({
//         model: "gemini-3.8-flash",
//         input: "print a joke",
//     }); 
    
//     console.log("Response received:");
//     console.log(interaction.output_text);
    
// } catch (error) {
//     // 2. If it fails or gets blocked, print the exact reason
//     console.error("Failed to fetch joke! Error details:");
//     console.error(error.message);
// }

import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import 'dotenv/config';
import cors from 'cors';  
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js"

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.use("/api" , chatRoutes);

app.listen(PORT , () => {
    console.log(`server running on ${PORT}`);
    connectDB();
});

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected with Database');
    }catch(err){
        console.log("Failed to connect with db", err);
    } 
}

// app.post("/test" , async(req , res) => {
//     const options={
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
//         },
//         body: JSON.stringify({
//             model: "gemini-3.8-flash",
//             messages: [
//             {
//                 role: "user",
//                 content: req.body.message,
//             }]
//         })
//     };

//     try{
//         const response = await fetch("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions" , options);
//         const data = await response.json();
//         // console.log(data[0].error.message);
//         res.send(data[0].error.message); // Reply
//     }catch(err){
//         console.log(err);
//     }
// });