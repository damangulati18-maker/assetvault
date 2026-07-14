const express = require("express");

const Item = require("../modals/items");
const Assign = require("../modals/assignment");
const Maintainance = require("../modals/maintainance");

const itemRouter = express.Router();

itemRouter.post("/addNewItem",async(req,res)=>{
    try{
        const{itemName,category,brand,status,quantity,purchasePrice,location} = req.body;
        const addItem = new Item({
            itemName,
            category,
            brand,
            status,
            quantity,
            purchasePrice,
            location
        })
        await addItem.save();

        res.send(addItem);

    }
    catch(err){
        res.status(400).send({ error: err.message });
    }
})

itemRouter.get("/getItems",async(req,res)=>{
    try{
        const itemList = await Item.find({});
        res.send(itemList);
    }
    catch(err){
        res.status(400).send({ error: err.message });
    }
})

itemRouter.post("/assignItem",async(req,res)=>{
    try{
        const{itemId,assignedTo,assignedBy,quantity,assignDate,returnDate,status} = req.body;
        const assignItem = new Assign({
            itemId,
            assignedTo,
            assignedBy,
            quantity,
            assignDate,
            returnDate,
            status
        })
        await assignItem.save();
        res.send(assignItem);
    }
    catch(err){
        res.status(400).send({ error: err.message });
    }
})

itemRouter.get("/getAssignedItems",async(req,res)=>{
    try{
        const assignList = await Assign.find({}).populate("itemId");
        res.send(assignList);
    }
    catch(err){
        res.status(400).send({ error: err.message });
    }
})

itemRouter.post("/addItemForMaintainance",async(req,res)=>{
    try{
        const {itemId,cost,issue,assignedDate,completeDate} = req.body;
        const addItem = new Maintainance({
            itemId,
            cost,
            issue,
            assignedDate,
            completeDate
        })
        await addItem.save();

        res.send(addItem);
    }
    catch(err){
        res.status(400).send({ error: err.message });
    }
})

itemRouter.get("/getItemsForRepairs",async(req,res)=>{
    try{
        const repairList = await Maintainance.find({}).populate("itemId");
        res.send(repairList);
    }
    catch(err){
        res.status(400).send({ error: err.message });
    }
})

module.exports = itemRouter;