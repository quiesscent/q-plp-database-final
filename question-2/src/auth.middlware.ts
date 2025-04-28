import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

const secretKey = 'your-secret-key'; // Replace with a secure key

export interface CustomJwtPayload extends JwtPayload {
  userId: number; // Assuming the userId is a string. Adjust the type if needed.
}

// Function to generate JWT token
export const generateToken = (userId: number) => {
  return jwt.sign({"userId":userId }, secretKey, { expiresIn: '1h' });
};

// Function to verify JWT token
export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    return null;
  }
};

export const authenticateJWT = (req: any, res: any, next: any) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).send('A token is required for authentication');
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).send('Invalid or expired token');
  }

  req.user = decoded;
  next();
};