CREATE PROCEDURE GetUser
    @Username VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT *
    FROM Users
    WHERE Username = @Username AND isDeleted = 0;
END;
GO
