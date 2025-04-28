// import { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// export const authenticateUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const token = req.headers.authorization?.split(" ")[1]; // Extract token
//   if (!token) return res.status(401).json({ error: "Unauthorized" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
//       id: number;
//       email: string;
//     };
//     req.user = decoded; // Attach user to req
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// };

// export default authenticateUser;

// // src/middleware/sessionMiddleware.ts

import { Request, Response, NextFunction } from 'express';

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    return next(); // User is authenticated, proceed
  }
  res.status(401).send('You need to log in first');
};

export const setSessionUser = (req: Request, user: { id: number; username: string }) => {
  req.session.user = user; // Store user in session
};

export const clearSessionUser = (req: Request) => {
  req.session.destroy((err) => {
    if (err) {
      return req.status(500).send('Failed to log out');
    }
  });
};
