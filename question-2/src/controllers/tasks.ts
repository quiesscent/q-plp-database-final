import { Request , Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

// create a prisma client
const prisma = new PrismaClient()


export const create = async (req: Request, res: Response) => {

    if (req.method == 'POST'){
        // get the titel and the description
        const { title , description } = req.body;
        try {
        const task = await prisma.task.create({
            data:{
                title,
                description,
                userId: req.session.user.id
            }
        });
        res.status(201).json({"message": "Task Added Successfully"})
    } catch (errr) {
        res.status(500).json({"error": "database or server error"})
    }
 } else {
    res.status(400).json({"error": "Method Not Allowed"})
 }
}
