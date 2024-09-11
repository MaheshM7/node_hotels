const express = require("express");
const router = express.Router();
const MenuItem = require("../modules/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newItem = new MenuItem(data);
    const response = await newItem.save();
    console.log("Menuu Item saved");
    res.status(200).json(response);
  } catch (error) {
    console.log("error while adding MenuItem");
    res.status(500).json({ error: "Internal server Error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/:tasteType', async (req,res)=>{
  const tasteType = req.params.tasteType;
  try {
    if(tasteType=="sweet" || tasteType=="spicy" || tasteType=="sour"){
      const response = await MenuItem.find({taste:tasteType});
      console.log("data fetched");
      res.status(200).json(response);
    }
    else{
      res.status(400).json({error:"taste type"})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

router.put('/:id', async (req,res)=>{
  try {
    const menuId = req.params.id;
    const updatedMenuData = req.body;
    const response = await MenuItem.findByIdAndUpdate(menuId,updatedMenuData,{
      new:true,
      runValidators:true
    })
    if (!response) {
      console.log("menuID not found");
      res.status(404).json({ error: "MenuId not found" });
    }
    console.log("data fetched");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const menuId = req.params.id;
    const response = await MenuItem.findByIdAndDelete(menuId);
    if (!response) {
      console.log("id not found");
      res.status(404).json({ error: "MenuItem not found" });
    }
    console.log("data deleted");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;