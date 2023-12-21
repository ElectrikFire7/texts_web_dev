import bcrypt from "bcrypt";
import express from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

router.post("/signin", async (request, response) => {
    try{
        if(!request.body.username || !request.body.password){
            return response.status(400).send({message: 'Send all required fields'})
        }

        const existingUser = await User.findOne(request.body.username);

        if (existingUser) {
            return response.status(400).send({ message: 'Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(request.body.password, 10);

        const newUser = {
            username: request.body.username,
            password: hashedPassword,
        }

        const user = await User.create(newUser);
        console.log("new user created");

        return response.status(201).send(user);
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send(error.message);
    }
});

router.post("/login", async (request, response) =>{
    try{
        const { username, password } = request.body;

        const user = await User.findOne({ username });

        if (!user) {
            return response.status(404).send({ message: "User not found" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return response.status(401).json({ error: "Incorrect password" });
        }

        return response.status(200).send({ username: user.username });
    }
    catch(error){
        console.log(error.message);
        return response.status(500).send(error.message);
    }
});

export default router;