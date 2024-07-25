import { Router } from 'express';
import { loginUser, registerUser, deleteUser, approveUser, welcomePage, getUsers } from '../controllers/authcontroller';
import { verifyToken} from '../middlewares';

const authroutes = Router();

authroutes.post('/register', registerUser);
authroutes.post('/login', loginUser);
authroutes.delete('/user/:id', verifyToken,  deleteUser);
authroutes.put('/approve/:id', verifyToken,  approveUser);  // Added this line
authroutes.get('', verifyToken, welcomePage);
authroutes.get('users', getUsers);

export default authroutes;


// import { Router } from "express";
// import { loginUser, registerUser, welcomePage } from "../controllers/authcontroller";
// import { verifyToken } from "../middlewares";


// const authroutes= Router()


// authroutes.post("/register", registerUser)
// authroutes.post("/login", loginUser)
// authroutes.get("",verifyToken, welcomePage)


// export default authroutes