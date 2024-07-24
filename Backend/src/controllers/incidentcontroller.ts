import { Response } from 'express';
import { v4 as uid } from 'uuid';
import { DbHelper } from '../databasehelpers';
import { IncidentRequest } from '../models/incidentmodels';


const dbHelper = new DbHelper();

export const addIncident = async (req: IncidentRequest, res: Response) => {
    const { title, description, imageUrl } = req.body;
    // const id = uuidv4(); // Generate a unique ID
    const id=uid()

    try {
        await dbHelper.exec('AddIncident', { id, title, description, imageUrl: imageUrl || '' });
        res.status(201).send({ message: 'Incident added successfully', id });
    } catch (error) {
        res.status(500).send({ error: 'Failed to add incident' });
    }
};


export const getIncidents = async (req: IncidentRequest, res: Response) => {
    try {
        const results = await dbHelper.query('SELECT * FROM Incidents');
        res.status(200).send(results.recordset);
    } catch (error) {
        console.error('Error fetching incidents:', error);
        res.status(500).send({ error: 'Failed to fetch incidents' });
    }
};
