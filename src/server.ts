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
