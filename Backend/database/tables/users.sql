USE CITIZENCONNECT;

CREATE TABLE Roles (
  RoleID INT PRIMARY KEY,
  RoleName VARCHAR(255) NOT NULL
);

INSERT INTO Roles (RoleID, RoleName) VALUES (1, 'citizen');
INSERT INTO Roles (RoleID, RoleName) VALUES (2, 'government official');
INSERT INTO Roles (RoleID, RoleName) VALUES (3, 'admin');

CREATE TABLE Users (
  Id INT PRIMARY KEY,
  Username VARCHAR(255) NOT NULL,
  Email VARCHAR(255) NOT NULL,
  Password VARCHAR(255) NOT NULL, 
  RoleID INT, 
  isDeleted INT DEFAULT 0,
  isEmailSent INT DEFAULT 0,
  FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);