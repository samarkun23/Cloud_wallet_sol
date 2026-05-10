import { Router } from "express";
import jwt from 'jsonwebtoken';
import {signUpSchema} from "common/input";
import { prismaClient } from "db/client";

const authRouter = Router();

authRouter.post("/signup", async (req,res) => {
    const result = signUpSchema.safeParse(req.body);
    console.log(result);
    if(!result.success) {
        res.status(403).json({
            message: "Incorrect credentials"
        })
        return;
    }

    const email = result.data?.email;
    const password = result.data?.password;

    const user = await prismaClient.user.findFirst({
        where: {
            email
        }
    });

    if(!user) {
        res.status(403).json({
            message: "User not found"
        })
        return;
    }

    //TODO :: NEED TO HASH PASSWORD
    if(user.password !== password) {
        res.status(403).json({
            message: "Incorrect password"
        })
        return;
    }

    const token = jwt.sign({
        userId: user.id
    }, process.env.JWT_SECRET!);

    res.json({
        token
    })
    
})

export {authRouter}
