const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
  origin: "*",
  credential: true,
};

//initialising DataBase
const { intializeDatabase } = require("./db/db.connect");
//export model here
const ProfileUser = require("./models/profileUser.models");

app.use(express.json());
app.use(cors(corsOptions));

//calling db
intializeDatabase();

app.get("/", (req, res) => {
  res.send("Express server");
});

// for posting Data
app.post("/profileUser", async (req, res) => {
  try {
    const createUser = new ProfileUser(req.body);
    const saveUserProfile = await createUser.save();
    if (saveUserProfile) {
      res.status(201).json({
        message: "Data added successfully",
        createUser: createUser,
      });
    } else {
      res
        .status(401)
        .json({ error: "An error occured while posting profile user" });
    }
  } catch (error) {
    res.status(500).json({
      error: "An error occured while creating while posting profile user.",
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
