const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
require('dotenv').config();

main()
    .then(()=>{
        console.log("connection succesful");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

let allChats = [
  {
    from: "Priya",
    to: "Neha",
    msg: "Yesterday I solved a hard DSA problem",
    date: new Date(),
  },
  {
    from: "Aman",
    to: "Rohit",
    msg: "Bro I completed my backend project today",
    date: new Date(),
  },
  {
    from: "Neha",
    to: "Priya",
    msg: "That's great! Keep going 💪",
    date: new Date(),
  },
  {
    from: "Ravi",
    to: "Aman",
    msg: "MongoDB Atlas finally connected 😅",
    date: new Date(),
  },
  {
    from: "Karan",
    to: "Arjun",
    msg: "Let's revise arrays today",
    date: new Date(),
  },
  {
    from: "Arjun",
    to: "Karan",
    msg: "Yes bro, prefix sum bhi karenge",
    date: new Date(),
  },
  {
    from: "Simran",
    to: "Neha",
    msg: "Frontend design complete ho gaya",
    date: new Date(),
  },
  {
    from: "Neha",
    to: "Simran",
    msg: "Nice! UI ka screenshot bhejo",
    date: new Date(),
  },
  {
    from: "Rahul",
    to: "Priya",
    msg: "Kal mock interview hai 😬",
    date: new Date(),
  },
  {
    from: "Priya",
    to: "Rahul",
    msg: "All the best! You will crack it 🚀",
    date: new Date(),
  },

];

Chat.insertMany(allChats);