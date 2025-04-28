import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { verifyToken, CustomJwtPayload } from "../auth.middlware";
// create a prisma client
const prisma = new PrismaClient();

export const create = async (req: Request, res: Response) => {
  if (req.method == "POST") {
    // get the titel and the description
    const { title, description } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1]; // Token is passed as "Bearer <token>"

    if (!token) {
      return res.status(403).json({ error: "No token provided" });
    }
    // Verify the token
    const decoded = verifyToken(token); // Verify the token using the utility function
    if (!decoded) {
      return res.status(401).json({ error: "Invalid or expired token" });
    }
    // Extract the userId from the decoded token (assuming it's in the token payload)
    const { userId } = decoded as CustomJwtPayload;

    try {
      const task = await prisma.task.create({
        data: {
          title,
          description,
          userId,
        },
      });
      res.status(201).json({ message: "Task Added Successfully" });
    } catch (errr) {
      res.status(500).json({ error: "database or server error" });
    }
  } else {
    res.status(400).json({ error: "Method Not Allowed" });
  }
};

// View Task by ID
export const view = async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = req.headers["authorization"]?.split(" ")[1]; // Token is passed as "Bearer <token>"

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }
  // Verify the token
  const decoded = verifyToken(token); // Verify the token using the utility function
  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(id),
      },
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json({ task: task });
  } catch (error) {
    res.status(500).json({ error: "Database or server error" });
  }
};

// Delete Task by ID
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = req.headers["authorization"]?.split(" ")[1]; // Token is passed as "Bearer <token>"

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }
  // Verify the token
  const decoded = verifyToken(token); // Verify the token using the utility function
  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  try {
    const task = await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });

    res.status(200).json({ message: "Task Deleted Successfully", task: task });
  } catch (error) {
    res.status(500).json({ error: "Database or server error" });
  }
};

// Change Task Status to Completed
export const completeTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const token = req.headers["authorization"]?.split(" ")[1]; // Token is passed as "Bearer <token>"

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }
  // Verify the token
  const decoded = verifyToken(token); // Verify the token using the utility function
  if (!decoded) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
  try {
    const task = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        completed: true,
      },
    });

    res
      .status(200)
      .json({ message: "Task status updated to completed", task: task });
  } catch (error) {
    res.status(500).json({ error: "Database or server error" });
  }
};
