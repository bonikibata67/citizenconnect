import mssql from 'mssql';
import ejs from 'ejs';
import { sqlConfig } from '../config';
import { sendEmail } from '../helpers';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export interface User {
  Id: string,
  Username: string,
  Email: string,
  Password: string,
  isDeleted: number,
  isEmailSent: number,
  RoleID: number,
}

export async function run() {
  try {
    const pool = await mssql.connect(sqlConfig);
    const users = (await pool.request().execute('spGetUsersForEmail')).recordset as User[];

    for (const user of users) {
      ejs.renderFile(path.join(__dirname, '../Templates/register.ejs'), { name: user.Username }, async (error, data) => {
        if (error) {
          console.error('Error rendering EJS:', error);
          return;
        }

        const messageOptions = {
          to: user.Email,
          from: process.env.EMAIL,
          subject: "Welcome to CITIZENCONNECT360",
          html: data,
        };

        await sendEmail(messageOptions);

        await pool.request()
          .input('UserId', mssql.NVarChar, user.Id)
          .execute('spUpdateEmailSentStatus');
      });
    }
  } catch (error) {
    console.error('Error in email service:', error);
  }
}
