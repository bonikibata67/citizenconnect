import express from 'express';
import cors from 'cors'; 
import authroutes from './routes/authroutes';
import { ensureRoles } from './ensureroles';
import viewsroutes from './routes/viewsroutes';
import incidentsRouter from './routes/incidentroutes';
import bodyParser from 'body-parser';
import pollrouter from './routes/pollroutes';

import cron from 'node-cron'



const app = express();




app.use(cors());
// app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.use(bodyParser.json());
app.use('/api', pollrouter);
app.use('/auth', authroutes); 
app.use('/views', viewsroutes);
app.use('/incidents', incidentsRouter);


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
}

);
