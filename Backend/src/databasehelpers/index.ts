import { ConnectionPool, Request } from 'mssql';
import { sqlConfig } from '../config';
import mssql from 'mssql'
import { User } from '../models/authmodels';


export class DbHelper {
    private pool: Promise<ConnectionPool>;

    constructor() {
        this.pool = mssql.connect(sqlConfig);
    }

    private createRequest(emptyRequest: Request, data: { [key: string]: string | number }) {
        const keys = Object.keys(data);
        keys.forEach(key => {
            emptyRequest.input(key, data[key]);
        });
        return emptyRequest;
    }

    async exec(storedProcedure: string, data: { [key: string]: string | number }) {
        const emptyRequest = (await this.pool).request();
        const request = this.createRequest(emptyRequest, data);
        return request.execute(storedProcedure);
    }

    async query(queryString: string) {
        return (await this.pool).request().query(queryString);
    }

    // async getUser(username: string) {
    //     try {
    //         const result = await this.exec('GetUser', { Username: username });
    //         return result.recordset[0];
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    async getUser(username: string): Promise<User | null> {
        try {
            const result = await this.exec('getUserByUsername', { username });
            return result.recordset[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async getOneUserByID(userID: string): Promise<User | null> {
        try {
            const result = await this.exec('getOneUserByID', { userID });
            return result.recordset[0] || null;
        } catch (error) {
            throw error;
        }
    }

    async getViews() {
        return this.exec('GetViews', {});
    }

        
    async addView(username: string, location: string, role: string, viewText: string) {
        const data = {
            Username: username,
            Location: location,
            Role: role,
            ViewText: viewText
        };
        return this.exec('AddView', data);
    }
}




