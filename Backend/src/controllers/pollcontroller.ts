import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { DbHelper } from '../databasehelpers';
import { PollOption, PollRequest, Poll } from '../models/pollmodel';

const dbHelper = new DbHelper();

export const addPoll = async (req: PollRequest, res: Response) => {
    const { title, question, options } = req.body;
    const id = uuidv4();

    try {
        await dbHelper.exec('AddPoll', { id, title, question, totalVotes: 0 });

        for (const option of options) {
            await dbHelper.exec('AddPollOption', {
                pollId: id,
                label: option.label,
                percentage: 0,
                votes: 0
            });
        }

        res.status(201).send({ message: 'Poll added successfully' });
    } catch (error) {
        console.error('Error adding poll:', error);
        res.status(500).send({ error: 'Failed to add poll' });
    }
};

export const getPolls = async (req: Request, res: Response) => {
    try {
        console.log('Fetching polls...');
        const pollsResult = await dbHelper.exec('GetPolls', {});
        const polls = pollsResult.recordset;

        if (!polls || polls.length === 0) {
            throw new Error('No polls found');
        }

        // Fetch options for each poll
        const pollsWithOptions = await Promise.all(polls.map(async (poll: Poll) => {
            const optionsResult = await dbHelper.exec('GetPollOptions', { pollId: poll.id });
            poll.options = optionsResult.recordset;
            return poll;
        }));

        console.log('Polls with options:', pollsWithOptions);
        res.status(200).json(pollsWithOptions);
    } catch (error) {
        console.error('Error fetching polls:', error);
        res.status(500).json({ error: 'Failed to fetch polls' });
    }
};


export const deletePoll = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await dbHelper.exec('DeletePoll', { id });
        res.status(200).send({ message: 'Poll deleted successfully' });
    } catch (error) {
        console.error('Error deleting poll:', error);
        res.status(500).send({ error: 'Failed to delete poll' });
    }
};
export const updatePoll = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, question, options, totalVotes } = req.body;

    try {
        await dbHelper.exec('UpdatePoll', { id, title, question, totalVotes });

        // Update poll options
        for (const option of options) {
            await dbHelper.exec('UpdatePollOption', {
                pollId: id,
                label: option.label,
                percentage: option.percentage,
                votes: option.votes
            });
        }

        res.status(200).send({ message: 'Poll updated successfully' });
    } catch (error) {
        console.error('Error updating poll:', error);
        res.status(500).send({ error: 'Failed to update poll' });
    }
};
export const votePollOption = async (req: Request, res: Response) => {
    const { pollId } = req.params;
    const { label } = req.body;

    try {
        const optionsResult = await dbHelper.exec('GetPollOptions', { pollId });
        const options = optionsResult.recordset;

        const option = options.find(option => option.label === label);
        if (!option) {
            return res.status(404).json({ error: 'Option not found' });
        }

        option.votes += 1;

        const totalVotes = options.reduce((acc, opt) => acc + opt.votes, 0);
        options.forEach(opt => {
            opt.percentage = Math.round((opt.votes / totalVotes) * 100);
        });

        await dbHelper.exec('UpdatePollOption', { pollId, label: option.label, percentage: option.percentage, votes: option.votes });
        await dbHelper.exec('UpdatePollTotalVotes', { id: pollId, totalVotes });

        res.status(200).json({ message: 'Vote recorded successfully' });
    } catch (error) {
        console.error('Error voting:', error);
        res.status(500).json({ error: 'Failed to record vote' });
    }
};
// export const votePollOption = async (req: Request, res: Response) => {
//     const { pollId } = req.params;
//     const { label } = req.body;

//     try {
//         // Get the poll options
//         const optionsResult = await dbHelper.exec('GetPollOptions', { pollId });
//         const options = optionsResult.recordset;

//         // Find and update the selected option
//         const option = options.find(option => option.label === label);
//         if (!option) {
//             return res.status(404).json({ error: 'Option not found' });
//         }

//         // Update option votes
//         option.votes += 1;

//         // Calculate total votes and update percentages
//         const totalVotes = options.reduce((acc, opt) => acc + opt.votes, 0);
//         options.forEach(opt => {
//             opt.percentage = Math.round((opt.votes / totalVotes) * 100);
//         });

//         // Update the database
//         await dbHelper.exec('UpdatePollOptions', { pollId, polloption });
//         await dbHelper.exec('UpdatePollTotalVotes', { id: pollId, totalVotes });

//         res.status(200).json({ message: 'Vote recorded successfully' });
//     } catch (error) {
//         console.error('Error voting:', error);
//         res.status(500).json({ error: 'Failed to record vote' });
//     }
// };

