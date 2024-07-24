import mssql from 'mssql';
import { sqlConfig } from './config';



export async function ensureRoles() {
    const pool = await mssql.connect(sqlConfig);

    // Define roles
    const roles = [
        { RoleID: 1, RoleName: 'citizen' },
        { RoleID: 2, RoleName: 'government official' },
        { RoleID: 3, RoleName: 'admin' }
    ];

    // Insert roles if they do not exist
    for (const role of roles) {
        await pool.request()
            .input('RoleID', mssql.Int, role.RoleID)
            .input('RoleName', mssql.VarChar, role.RoleName)
            .query('IF NOT EXISTS (SELECT 1 FROM Roles WHERE RoleID = @RoleID) INSERT INTO Roles (RoleID, RoleName) VALUES (@RoleID, @RoleName)');
        
        console.log(`Checked role: ${role.RoleName}`);
    }

    console.log('Roles ensured');
    pool.close();
}
