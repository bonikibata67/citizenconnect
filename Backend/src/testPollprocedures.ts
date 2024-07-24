// testPollProcedures.ts
import mssql from 'mssql';
import { sqlConfig } from './config';


async function testPollProcedures() {
    const pool = await mssql.connect(sqlConfig);

    try {
        const pollId = 'some-uuid';
        const title = 'Lorem Ipsum Incident';
        const question = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
        const totalVotes = 0;

        // Test AddPoll
        await pool.request()
            .input('Id', mssql.NVarChar, pollId)
            .input('Title', mssql.NVarChar, title)
            .input('Question', mssql.NVarChar, question)
            .input('TotalVotes', mssql.Int, totalVotes)
            .execute('AddPoll');

        console.log('AddPoll executed successfully');

        // Test AddPollOption
        const optionLabel = 'Yes';
        const percentage = 0;
        const votes = 0;

        await pool.request()
            .input('PollId', mssql.NVarChar, pollId)
            .input('Label', mssql.NVarChar, optionLabel)
            .input('Percentage', mssql.Int, percentage)
            .input('Votes', mssql.Int, votes)
            .execute('AddPollOption');

        console.log('AddPollOption executed successfully');

        // Test GetPolls
        const result = await pool.request().query('EXEC GetPolls');
        console.log('GetPolls result:', result);

        // Test DeletePoll
        await pool.request()
            .input('Id', mssql.NVarChar, pollId)
            .execute('DeletePoll');

        console.log('DeletePoll executed successfully');

    } catch (err) {
        console.error('Error executing procedures:', err);
    } finally {
        pool.close();
    }
}

testPollProcedures();
