import { Router } from 'express';
import { run } from '../Emailservice/Emailservice';

const emailrouter = Router();

emailrouter.post('/send-emails', async (req, res) => {
  try {
    await run();
    res.status(200).send('Emails sent successfully.');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Failed to send emails.');
  }
});

export default emailrouter;
