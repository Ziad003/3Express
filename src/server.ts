import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import type { AnyARecord } from "node:dns";
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

const initDb = async () => {
  try {
    await pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(20) NOT NULL,
                    email VARCHAR(50) UNIQUE NOT NULL,
                    password VARCHAR(20) NOT NULL,
                    is_active BOOLEAN DEFAULT true,

                    crated_at TIMESTAMP DEFAULT NOW(),
                    updated_at TIMESTAMP DEFAULT NOW()
         )
            `);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
  }
};
initDb();

app.get("/", (req: Request, res: Response) => {
  //   res.send("Hello World!");
  res.status(200).json({ message: "This is root" });
});

app.post("/api/users", async (req: Request, res: Response) => {
  // console.log(req.body)
  const { name, email, password } = req.body;

  try {
    const result = await pool.query(
      `
        INSERT INTO users(name, email, password) VALUES($1,$2,$3) RETURNING *
    `,
      [name, email, password],
    );
    // console.log(result.rows[0])

    res
      .status(201)
      .json({ message: "User created successfully", data: result.rows[0] });
  } catch (error: any) {
    res.status(500).json({ message: error.message, error: error });
  }
});

app.get('/api/users', async(req: Request, res: Response) => {
   try {
    const result=await pool.query(`
        SELECT * FROM users
      `)
      res.status(200).json({
        success:true,
        message:"Users retrived successfully",
        data:result.rows})
   } catch (error:any) {
    res.status(500).json({
        success:false,
        message: error.message,
        error:error})
   }
});

app.get('/api/users/:id',async(req: Request, res: Response) => {
  const {id}=req.params;
  // const id=req.params.id;
  // console.log(id)
  try {
    const result=await pool.query(`
          SELECT * FROM users 
          WHERE id=$1
      `,[id]);

      if(result.rows.length === 0){
        res.status(500).json({
        success:false,
        message:"User not found",
        data:{}})
      }

      res.status(200).json({
        success:true,
        message:"User retrived successfully",
        data:result.rows[0]})
  } catch (error:any) {
    res.status(500).json({
        success:false,
        message: error.message,
        error:error})
   
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
