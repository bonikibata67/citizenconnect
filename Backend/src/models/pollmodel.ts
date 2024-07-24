// src/models/pollModel.ts
import { Request } from 'express';

export interface PollOption {
    pollId: string;  // Ensure pollId is included
    label: string;
    percentage: number;
    votes: number;
}

export interface Poll {
    id: string;
    title: string;
    question: string;
    options: PollOption[];
    totalVotes: number;
}

export interface PollRequest extends Request {
    body: {
        title: string;
        question: string;
        options: PollOption[];
    };
}

 
  

