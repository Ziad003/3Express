import express, { type Application, type Request, type Response } from "express";
const app : Application = express();
const port = 3000;

// app.use(express.json());

app.get("/", (req: Request, res: Response) => {
//   res.send("Hello World!");
  res.status(200).json({ message: "This is root" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
