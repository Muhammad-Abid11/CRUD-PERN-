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

-- Authentication 

- psql -U postgres
- \c perntodo
- CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(200) UNIQUE NOT NULL,
    password VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
- npm install bcryptjs jsonwebtoken



-----------------------------------------

// Since their is no relationship between tables and user that why I am getting todo table data in all user.

ALTER TABLE todo
ADD COLUMN user_id INT REFERENCES users(user_id);


If you don’t have a users table yet, use:

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    user_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(user_id)
);

Now I also update put and delete routes to check whether the todo belongs to the user or not.



-----------------------------------------


\l => list all database in postgresql

\c => move inside a database

\dt => show table in database



*/


// ---------------- NEON DATABASE ----------------------------

/*---------------MIGRATION----------------
------------------------------------------------------------
1) Create a dump file from your LOCAL PostgreSQL database
------------------------------------------------------------
    This command exports your entire local database (schema + data)
    into a .sql file. You will upload this to Neon later.
*/
//pg_dump -U postgres -d perntodo > local_dump.sql



/*
------------------------------------------------------------
2) Convert the dump file into CLEAN UTF-8 encoding
------------------------------------------------------------
    Windows often creates dump files with a BOM (0xFF) or ANSI
    encoding. Neon only accepts UTF-8.  
    This command removes BOM and converts file to proper UTF-8.
*/
//Get-Content local_dump.sql | Set-Content local_dump_clean.sql -Encoding UTF8



/*
------------------------------------------------------------
 3) Import the cleaned dump file into the Neon PostgreSQL database
------------------------------------------------------------
    This uploads your schema and data from local_dump_clean.sql
    into your Neon cloud database.  
    Use the connection string provided by Neon Dashboard.
*/

//psql "postgresql://neondb_owner:npg_bAwCOhu9MK6g@ep-rapid-sound-adlqo25z-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require" -f local_dump_clean.sql


/* 
⭐ Summary (short version)
Dump local DB → local_dump.sql
Convert to UTF-8 → local_dump_clean.sql
Import to Neon → run psql with -f local_dump_clean.sql 
*/


// In PostgreSQL, if your search_path doesn’t include public, it will fail with:
// const users = await pool.query("SELECT * FROM users");           // wrong for deployed database

// const users = await pool.query("SELECT * FROM public.users");    //  correct


// ----------------DOCKER COMMANDS----------------
/* 

File Need to Create
- "DockerFile.server" in the root directory or "DockerFile" inside "server" directory
- ".dockerignore" file inside "server" directory

- "DockerFile.client" in the client directory or "DockerFile" inside "client" directory
- ".dockerignore" file in the "client" directory

- "docker-compose.yml" in the root directory( it is used to define and run multi-container Docker applications )

Commands
- docker run -p 3000:3000 crud-pern-client:latest ( is used to run the client image, terminal close image also close )
- docker run -p 5001:5001 crud-pern-server:latest ( is used to run the server image, terminal close image also close )
(5001:5001  here 1st 5001 is port of host and 2nd 5001 is port of container)

- docker-compose up --build ( is used to build and run the containers using docker-compose.yml file, terminal close image not close )
- docker-compose build ( is used to build the containers using docker-compose.yml file )
- docker build -t crud-pern-client . ( create build with name crud-pern-client )

- docker-compose up ( is used to run the containers using docker-compose.yml file, terminal close image not close )
- docker-compose down ( is used to stop and remove the containers )

- docker-compose ps ( is used to show the running containers )
- docker-compose logs ( is used to show the logs of the containers )

- docker images ( is used to show the images )
- docker system prune -a ( is used to delete all images )

*/