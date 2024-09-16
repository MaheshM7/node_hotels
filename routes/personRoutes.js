const express = require("express");
const router = express.Router();
const Person = require("./../modules/person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    response = await newPerson.save();
    console.log("data saved");

    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log("Payload: ", JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is: ", token);

    res.status(200).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Login Route
router.post("/login", async (req, res) => {
  try {
    //Extract username and password from the request bodu;
    const { username, password } = req.body;

    //Find the user by username
    const user = await Person.findOne({ username: username });
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({ error: "Invalid usesrname or password" });
    }

    //generate token;
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);

    //Return token as response
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("User Data: ", userData);

    const userId = userData.id;
    const user = await Person.findById(userId);

    res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({error:'Internal server error'})
    
  }
});

router.get("/:workType", async (req, res) => {
  let workType = req.params.workType;
  try {
    if (workType == "chef" || workType == "waiter" || workType == "manager") {
      const response = await Person.find({ work: workType });
      console.log("response successfully fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid Work Type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      console.log("person not found");
      res.status(404).json({ error: "Person not found" });
    }

    console.log("data fetched");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);
    if (!response) {
      console.log("id not found");
      res.status(404).json({ error: "person not found" });
    }
    console.log("data deleted");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
