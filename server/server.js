const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
const port = 8080;
const fs = require('fs');
const path = require('path');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/',(req,res) => {
  res.send('Hello from Express!');
});

app.listen(port, () => {
  console.log('Express listening on port 8080');
});


const filePath = path.join(__dirname , "constants","bookedSlots.json");
// const slots = require(filePath);



  app.post("/booking",(req,res) => {
    fs.readFile(filePath,"utf8", (err,data) => {
      if(err) return res.status(500).send("Could not read file");

      let slotsBooked = JSON.parse(data);
      const {title, desc, location, slot} = req.body;

      const slotExists = slotsBooked.some(s => s.slot === slot);
      if(slotExists){
        return res.status(400).send("This slot is not available to book, please select a different slot")
      }

      const newSlot = {
        id:slotsBooked.length+1,
        slot,
        title,
        desc,
        location,
      }
      slotsBooked.push(newSlot);

      fs.writeFile(filePath, JSON.stringify(slotsBooked,null,2),(err) => {
          if(err) return res.status(500).send("Could not write file",err);
          return res.status(201).send("Slot booked correctly",newSlot);
      })
    })
  })




//Read file
// console.log("Trying to read file:", filePath);
// fs.readFile(filePath, 'utf-8', (err, data) => {
//     if (err) {
//         console.error("Error reading file:", err);
//         return;
//     }else{
//       console.log("File exists")
//     }
//     const jsonData = JSON.parse(data);
//     console.log(jsonData);
// });

//Write file 
// const data = {
//   id:3,
//   slot:"1-2",
//   title:"Job interview",
//   desc:"Meeting for job interview",
//   location:"Remote",

// };
// const jsonData = JSON.stringify(data,null,2);
// fs.writeFile(filePath,jsonData,(err) =>{
//   if(err){
//     console.log("Error");
//   }else{
//     console.log("File has been written successfully")
//   }
// })