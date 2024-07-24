import { Router } from 'express';
import { addView, getViews } from '../controllers/viewscontroller';


const viewsrouter = Router();

viewsrouter.post('/', addView);
viewsrouter.get('/', getViews);

export default viewsrouter;


