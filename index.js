const express = require("express");
const cors = require("cors");
const { where } = require("sequelize");
const app = express();
const port = 3000;
const bcrypt = require("bcrypt");
const sequelize = require("./database/event"); 
const bodyParser = require("body-parser");


const User = require("./model/user");
const Loged = require("./model/loged");


app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.get("/api/loged/data", async (req, res) => {
  const logs = await Loged.findAll();
  res.json(logs);
});

app.get("/test", async (req, res) => {
  res.json({message: "your server is live"});
});

app.post("/api/loged/register", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  console.log(req.body)

  try {
    const existing = await Loged.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Email registered" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password not match" });
    }

    const newUser = await Loged.create({ username, email, password });
    res.json({ message: "Usajili umefanikiwa", user: newUser });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/loged/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Loged.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Email not found in the database" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: " incorrect Password" });
    }
    console.log("successufly login: ",user)
   return res.status(200).json({ message: "Login successful", user });

  //  res.json({
  //     message: "Login successful",
  //     user: {
  //       id: user.id,
  //       username: user.username,
  //       email: user.email,
  //       createdAt: user.createdAt,
  //     }
  //   });



  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/api/loged/:id", async (req, res) => {
  const { id } = req.params;
  await Loged.update(req.body, { where: { id } });
  res.json({ message: "Loged updated successfully" });
});


app.delete("/api/loged/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Loged.destroy({ where: { id } });
  res.json({ message: "Loged deleted successfully" });
});


app.get("/api/user/data", async (req, res) => {
  const getData = await User.findAll();
  res.json(getData);
});

app.post("/api/men/post", async (req, res) => {
  const reqdata = req.body;
  const database_response = await User.create(reqdata);
  return res.status(200).json(database_response)
});

app.put("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  await User.update(req.body, { where: { id } });
  res.json({ message: "Updated successfully" });
});

app.delete("/api/user/delete/:id",async(req,res)=>{
  const {id} = req.params;
  await User.destroy({
    where:{
      id: id
    }
  })
})
app.listen(port, () => {
  console.log("server is active at port", port);
});
