import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.body.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

// export const ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
//     if (req.body.user.role !== 3) {
//         return res.status(403).json({ message: 'Access denied. Admins only.' });
//     }
//     next();
// };



// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { Payload } from '../models/authmodels';
// import  dotenv  from 'dotenv';
// import path from 'path'



// export interface ExtendedRequest1 extends Request{
//     info?:Payload
// }

// export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
//     const token = req.header('Authorization')?.split(' ')[1];

//     if (!token) {
//         return res.status(403).json({ message: 'Access denied' });
//     }

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET as string);
//         req.body.user = verified;
//         next();
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// };
// export function isAdmin(req: ExtendedRequest1, res: Response, next: NextFunction) {
//     if (req.info?.role !== 'admin') {
//         return res.status(403).json({ message: 'Admin access only' });
//     }
//     next();
// }
