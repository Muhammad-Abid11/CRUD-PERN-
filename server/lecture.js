/*

https://www.youtube.com/watch?v=ldYcgPKEZC8

npm i express pg cors

npm i --save-dev nodemon 


npm i express pg cors dotenv

npm i --save-dev nodemon

-----------------------------------------

INITIAlIZE PROJECT SETUP

CREATE POSTGRESQL DATABASE

//---- POSTGRESQL DATABASE
\l --> list all database in postgresql
\dt --> show table in database
\c databasename --> move inside a database


\dt
Did not find any tables.
postgres=# \d
Did not find any relations.
postgres=# create database perntodo; --->CREATE DATABASE
postgres=# \c perntodo
You are now connected to database "perntodo" as user "postgres".
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE DATABASE postgres()

psql -U postgres ( if it is not working either you already installed postgresql then 
    you should setup environment variable as we done below )

setx PATH "%PATH%;C:\Program Files\PostgreSQL\18\bin"
SUCCESS: Specified value was saved.
psql --version

now you can connect to postgresql

psql -U postgres

after successfully connected, 

CREATE DATABASE perntodo;
\c perntodo
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

-----------------------------------------


\l => list all database in postgresql

\c => move inside a database

\dt => show table in database



*/