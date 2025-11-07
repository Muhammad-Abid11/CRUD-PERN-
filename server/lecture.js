/*

https://www.youtube.com/watch?v=ldYcgPKEZC8

npm i express pg cors

npm i --save-dev nodemon 


npm i express pg cors dotenv

npm i --save-dev nodemon

-----------------------------------------

CRETE POSTGRESQL DATABASE


CREATE DATABASE postgres()

psotgres -U postgres ( if it is not working either you already installed postgresql then 
    you should setup environment variable as we done below )

setx PATH "%PATH%;C:\Program Files\PostgreSQL\18\bin"
SUCCESS: Specified value was saved.
psql --version

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