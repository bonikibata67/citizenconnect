
USE CITIZENCONNECT;
GO;
CREATE OR ALTER PROCEDURE AddUser(
    @Id VARCHAR(255),
    @username VARCHAR(255),
    @email VARCHAR(255),
    @password VARCHAR(255),
    @roleid INT
)
AS
BEGIN
    INSERT INTO Users (Id, Username, Email, Password, RoleID)
    VALUES ( @Id, @username, @email, @password, @roleid);
END;
GO