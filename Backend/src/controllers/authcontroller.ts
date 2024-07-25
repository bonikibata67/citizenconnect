import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uid } from 'uuid';
import path from 'path';
import dotenv from 'dotenv';
import { DbHelper } from '../databasehelpers';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const dbHelper = new DbHelper();

// Register a new user
export const registerUser = async (req: Request, res: Response) => {
    const id = uid();
    const { Username, Email, Password, RoleID } = req.body;

    try {
        if (!Username || !Email || !Password || RoleID == null) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(Password, 10);

        await dbHelper.exec('AddUser', {
            Id: id,
            username: Username,
            email: Email,
            password: hashedPassword,
            roleid: RoleID
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'An unknown error occurred' });
        }
    }
};

export const loginUser = async (req: Request, res: Response) => {
    const { Username, Password } = req.body;

    try {
        const user = await dbHelper.getUser(Username);

        if (!user) {
            return+ res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(Password, user.Password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        if (user.isApproved === 0) {
            return res.status(403).json({ error: 'User not approved by admin' });
        }

        const token = jwt.sign(
            { Sub: user.Id, Username: user.Username, role: user.RoleID },
            process.env.JWT_SECRET as string,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error in loginUser:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
};
export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await dbHelper.exec('GetAllUsers',{});
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
};

// Admin-only delete user
export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { roleID } = req.body;

    try {
        if (roleID !== 3) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        await dbHelper.exec('deleteUser', { Id: parseInt(id) });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error });
    }
};

// Admin approve user
export const approveUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { roleID } = req.body;

    try {
        // Check if the roleID is valid
        if (roleID !== 3) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        // Call the stored procedure to update the user's role
        await dbHelper.exec('ApproveUser', { Id: id, RoleID: roleID });
        res.status(200).json({ message: 'User approved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to approve user', error });
    }
};

// Welcome page
export const welcomePage = (req: Request, res: Response) => {
    res.status(200).json({ message: `Welcome, ${req.body.user.Username}!` });
};
