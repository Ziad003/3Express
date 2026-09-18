import express, { type Application, type Request, type Response } from "express";
const app : Application = express();
const port = 3000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
  res.status(200).json({ message: "This is root" });
});

app.post("/",(req:Request,res:Response)=>{
    // console.log(req.body)
    const {name,email,password}=req.body;
    res.status(201).json({message: "Created", data: {name,email}});
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
