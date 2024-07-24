GO

CREATE TABLE Polls (
    Id NVARCHAR(36) PRIMARY KEY,
    Title NVARCHAR(255) NOT NULL,
    Question NVARCHAR(MAX) NOT NULL,
    TotalVotes INT DEFAULT 0
);

CREATE TABLE PollOptions (
    PollId NVARCHAR(36),
    Label NVARCHAR(255),
    Percentage INT DEFAULT 0,
    Votes INT DEFAULT 0,
    FOREIGN KEY (PollId) REFERENCES Polls(Id)
);