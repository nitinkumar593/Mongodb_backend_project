require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const Chat = require("./models/chat.js");

main()
    .then(() => {
        console.log("connection succesful");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}

app.use(methodOverride("_method")); // for using patch or delete request
app.use(express.urlencoded({ extended: true })); // for req.body for post req
app.use(express.static(path.join(__dirname, "public")));  //for using css in public folder
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); //for using ejs in views folder

// index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("home.ejs", { chats });
});

//create new post
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

//add new post
app.post("/chats", (req, res) => {
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        date: new Date()
    });
    newChat.save()
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    res.redirect("/chats");
});
// edit route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});
// update route
app.put("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg: newMsg } = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg },
        { runValidators: true, new: true }
    );
    res.redirect("/chats");
});
// delete route
app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let deleteChat = await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})

app.get("/", (req, res) => {
    res.send("working root");
});

app.listen(8080, () => {
    console.log("app is listening to port");
});