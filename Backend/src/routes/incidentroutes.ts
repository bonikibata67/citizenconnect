import { Router } from 'express';
import { addIncident, getIncidents} from '../controllers/incidentcontroller';


const incidentsRouter = Router();

incidentsRouter.post('/', addIncident);
incidentsRouter.get('/', getIncidents);


export default incidentsRouter;
