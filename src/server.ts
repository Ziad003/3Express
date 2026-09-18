import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";

const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_m0oetXDrEJ3C@ep-rapid-mountain-b5mb6uhh-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

const initDb= async ()=>{
    try {
        await pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(20) NOT NULL,
                    email VARCHAR(50) NOT NULL,
                    password VARCHAR(20) NOT NULL,
                    is_active BOOLEAN DEFAULT true,

                    crated_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW()
         )
            `)
            console.log("Database connected successfully")
    } catch (error) {
        console.log(error)
    }
}
initDb();

app.get("/", (req: Request, res: Response) => {
  //   res.send("Hello World!");
  res.status(200).json({ message: "This is root" });
});

app.post("/", (req: Request, res: Response) => {
  // console.log(req.body)
  const { name, email, password } = req.body;
  res.status(201).json({ message: "Created", data: { name, email } });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
