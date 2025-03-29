import express, { Request, Response } from "express";
import cors from "cors";



const app = express();
const port = parseInt('3001');
 
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
  console.log("Inside GET request with count:", count1);

  let elapsedTime = 0;
  const checkCount = () => {
    if (isBellRung && count !== count1) {
      console.log("Count changed. Sending response.");
    
      res.json({ isBellRung, count });
    } else if (elapsedTime >= 60000) {
      console.log("60 seconds over. Sending default response.");
      res.json({ isBellRung: false, count });
    } else {
      elapsedTime += 100;
      setTimeout(checkCount, 100); 
    }
  };

  checkCount();
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default port;