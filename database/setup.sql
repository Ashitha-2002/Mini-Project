CREATE DATABASE amc_portal;

USE amc_portal;

CREATE TABLE User (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Department VARCHAR(255) NOT NULL,
    Email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
);

CREATE TABLE Engineer (
    EngineerID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
);

CREATE TABLE Service_request (
    RequestID CHAR(4) PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Department VARCHAR(255) NOT NULL,
    Contact_no VARCHAR(15) NOT NULL,
    DeviceType VARCHAR(255) NOT NULL,
    ProblemDescription TEXT NOT NULL,
    Status ENUM('Open', 'In Progress', 'Resolved', 'Reopened') NOT NULL DEFAULT 'Open',
    AssignedEngineer VARCHAR(255),
    Reporting_Date DATE NOT NULL,
    Reporting_Time TIME NOT NULL,
    DateResolved DATE DEFAULT NULL,
    FOREIGN KEY (AssignedEngineer) REFERENCES Engineer(Name) ON DELETE SET NULL,
    FOREIGN KEY (Email) REFERENCES User(Email) ON DELETE CASCADE
);

CREATE TABLE Admin (
    AdminID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Engineer_requests (
    EngineerID INT,
    RequestID CHAR(4),
    PRIMARY KEY (EngineerID, RequestID),
    FOREIGN KEY (EngineerID) REFERENCES Engineer(EngineerID) ON DELETE CASCADE,
    FOREIGN KEY (RequestID) REFERENCES ServiceRequest(RequestID) ON DELETE CASCADE
);


 insert into admin values(101,'John','admin@gmail.com','$2b$12$wBIKT0oBRQPOFHbXtRfkVuYxc6gyZT1OQnTeQMpX.q.1AY634aXBO'); # password - admin@123

 INSERT INTO Service_requests (
      RequestID, Name, Email, Department, Contact_no, DeviceType, 
      ProblemDescription, Status, AssignedEngineer, Reporting_Date, 
      Reporting_Time, DateResolved
    ) VALUES ('1234', 'Ashitha', 'ash@gmail.com', 'Computer science', '9999444444', 'printer', 'Not working', 'Open', NULL, '2025-02-26', '21:21', NULL);