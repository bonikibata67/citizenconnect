
CREATE PROCEDURE spGetUsersForEmail
AS
BEGIN
    SELECT * FROM Users WHERE isEmailSent = 0
END

GO

CREATE PROCEDURE spUpdateEmailSentStatus
    @UserId NVARCHAR(50)
AS
BEGIN
    UPDATE Users
    SET isEmailSent = 1
    WHERE Id = @UserId
END
