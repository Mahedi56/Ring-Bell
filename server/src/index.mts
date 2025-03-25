import express, { Request, Response } from "express";
import cors from "cors";
import { EventEmitter } from "events";

const bellEmitter = new EventEmitter();
const app = express();
const port = parseInt("3001");

app.use(cors());
app.use(express.json());


let count: number = 0;

app.post("/ringbell", (req: Request, res: Response) => {
  count++;

  bellEmitter.emit("ringed", {count });

  res.json({ success: true });
});

app.get("/bellstatus", (req: Request, res: Response) => {
  res.json({ count });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default port;
