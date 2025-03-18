const express = require("express");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let isBellRung = false;
let count=0;
app.post("/ringbell", (req, res) => {
  isBellRung = true; 
  res.send({ success: true });
});

app.get("/bellstatus", (req, res) => {
  
  if(isBellRung===false){
    count=0;
  }
  else{
    count++;
    if(count<=3)
      isBellRung=false;
  }

    res.json({ isBellRung,count });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
