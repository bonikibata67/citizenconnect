CREATE OR ALTER PROCEDURE ApproveUser(
    @Id VARCHAR(255),
    @roleID INT
)
AS
BEGIN
    UPDATE Users
    SET RoleID = @roleID
    WHERE Id = @Id;
END;
GO