import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let isBellRung: boolean = false;
let count: number = 0;

app.post("/ringbell", (req: Request, res: Response) => {
  isBellRung = true;
  count++;
  res.json({ success: true }); 
});

app.get("/bellstatus", (req: Request, res: Response) => {
  const count1: number = Number(req.query.count);

  if (isBellRung && count !== count1) {
    res.json({ isBellRung, count });
  } else {
    isBellRung = false;
    res.json({ isBellRung, count });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
