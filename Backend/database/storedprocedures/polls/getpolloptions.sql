CREATE PROCEDURE GetPollOptions
    @PollId NVARCHAR(36)
AS
BEGIN
    SELECT 
        po.PollId AS pollId,
        po.Label AS label,
        po.Percentage AS percentage,
        po.Votes AS votes
    FROM PollOptions po
    WHERE po.PollId = @PollId
END