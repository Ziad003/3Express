project_Initialize: [npm init -y]
	then dev dependency, [npm i -D typescript] because need for development but no need for production (for production it will be converted as js) that's why using dev dependency
Next, create ts config file: [npx tsc --init] {here uncomment rootDir and outDir. And change "module":nodenext to "module":esnext also 'type':["node"] lastly at the bottom {commentout "jsx":"React-jsx"}

Next, in package.json, change {"type":"commonjs" to "type":"module"}
Next, install [npm install express]

Now {create src folder and here in src folder create server.ts file} (Optional: To convert typescript to js in the dist folder for production [npx tsc]) and [copy pest the first code from express documentation but here we will use import-export instead of required.] {import express from "express"}[because we will use esm, not commonjs] but to use "express" install [npm i --save-dev @types/express] as typescript doesn't support express by default.

Next, To run the server/code we have to install package[npm i -D tsx] as devDependence as we don't need it as Dependencies

Next, Write ["dev":"tsx watch ./ServerFileLocation"] {inside "Script":{} in the package.json file} it will track whether any file is changing or not. 


To connect express server with cloude database service "Neondb" we use "postgres". To install it [npm i pg] 
Next, write code in the server.ts:
const pool=new Pool({
  connectionString : "//Connection string from Neonbd"
})
[Connection string can be found from connect option of project in Neondb]

to run this {import {Pool} from "pg"} and to enable for typescript [npm i --save-dev @types/pg]


To initialize Database and to create table in the database, 
const initDB = async () => {
  try {
    await pool.query(`
       //CREATE TABLE query
    `);
  } catch (error) {
 
  }
};
initDB();

To insert value in the created table (in post method):
const result=await pool.query(`
        INSERT INTO users(name, email, password) VALUES($1,$2,$3) RETURNING *
    `,[name,email,password]);

res.status(201).json({ message: "Created", data: result.rows[0] });


Set up Environment-based Configurations:
{Create .env file in the root. Inside .env file pest connection string and port
CONNECTIONSTRING="//pest the connection string here"
PORT=//pest the port here;
}
then [npm i dotenv]
{
create config folder inside src. And inside config folder create index.ts file and inside this file:
import dotenv from "dotenv";
import path from "path";
dotenv.config({
    path: path.join(process.cwd(),".env")
})

const config={
    connection_string:process.env.CONNECTIONSTRING as string,
    port:process.env.PORT
};

export default config;
}

To use connection string and port inside server.ts:
const port = config.port; {import config from "./config";}
connectionString: config.connection_string,
