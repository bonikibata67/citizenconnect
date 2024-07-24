use CITIZENCONNECT;


DROP PROCEDURE GetPolls;

GO
CREATE PROCEDURE GetPolls
AS
BEGIN
    SELECT 
        p.Id AS id,
        p.Title AS title,
        p.Question AS question,
        p.TotalVotes AS totalVotes
    FROM Polls p
END