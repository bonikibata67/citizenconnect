import { Request } from 'express';

export interface Incident {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

export interface addIncident{
    title: string;
    description: string;
    imageUrl?: string;
}

export interface IncidentRequest extends Request {
    body:addIncident
}