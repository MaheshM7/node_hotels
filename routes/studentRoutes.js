const express = require('express');
const Student = require('../modules/student');
const router = express.Router();



router.post("/", async (req,res)=>{
  try {
    const data = req.body;
    const newStudent = new Student(data);
    response = await newStudent.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

module.exports = router