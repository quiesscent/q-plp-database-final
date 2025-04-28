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
                userId:1
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


// View Task by ID
export const view = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const task = await prisma.task.findUnique({
        where: {
          id: parseInt(id)
        }
      });

      if (!task) {
        return res.status(404).json({ "error": "Task not found" });
      }

      res.status(200).json({ "task": task });
    } catch (error) {
      res.status(500).json({ "error": "Database or server error" });
    }
  };

  // Delete Task by ID
  export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const task = await prisma.task.delete({
        where: {
          id: parseInt(id)
        }
      });

      res.status(200).json({ "message": "Task Deleted Successfully", "task": task });
    } catch (error) {
      res.status(500).json({ "error": "Database or server error" });
    }
  };

  // Change Task Status to Completed
  export const completeTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const task = await prisma.task.update({
        where: {
          id: parseInt(id)
        },
        data: {
          completed: true
        }
      });

      res.status(200).json({ "message": "Task status updated to completed", "task": task });
    } catch (error) {
      res.status(500).json({ "error": "Database or server error" });
    }
  };
