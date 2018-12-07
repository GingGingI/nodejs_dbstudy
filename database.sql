CREATE DATABASE testdb;

USE testdb;

CREATE TABLE user 
(
    userid int,
    username varchar(255)
);

Insert Into user (userid, username)
values (12, 'hihello');

Select * from user;