import { run } from '../../backgroundservice/src/Emailservice/Emailservice';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import emailrouter from './routes/emailroutes';
import cron from 'node-cron'

const app = express();



app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use('/emails', emailrouter); 

cron.schedule('*/10 * * * * *', async() => {
    await run()
   });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
}

);