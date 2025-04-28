import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setSessionUser } from "../auth.middlware";
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient()

// secret key for session management
const SECRET = 'my secret key'

export const register = async (req: Request, res: Response ) => {
    if ( req.method == 'POST'){
        // get the form data on register
        const { email, username, password } = req.body
        try {
            const passwordHash = await bcrypt.hash(password, 10)
            const user = await prisma.user.create({
                data:{
                    email,
                    password:passwordHash,
                    username
                }
            });
            res.status(201).json({"success": "User Created", "user": user })
        } catch (err){
            res.status(400).json({"error": err})
        }
    }
    else {
        res.status(400).json({"status": "method not allowed"})
    }
}

// login middleware
export const login = async (req: Request, res: Response) => {
    if (req.method == 'POST'){
        const { email, password } = req.body;
        try {
            const user = await prisma.user.findUnique({
                where:{
                    email:email
                }
            });
            if (!user) return res.status(400).json({"error": "user not found "})
            const passwordMMatch = await bcrypt.compare(password, user.password)
            if (!passwordMMatch) return res.status(400).json({"error": "Password Authentication Fail"})
            // const token = jwt.sign({userId: user.id }, SECRET, {expiresIn: "1h"})
            // res.json({ token })
            setSessionUser(req, {"id": user.id, "username": user.username});
            res.status(200).json({"message": "login successfull"})
            
        } catch (error){
            res.status(500).json({error: error})
        }
    }
    else {
        res.status(400).json({"status": "method not allowed"})
    }
}
