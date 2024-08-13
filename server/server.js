const json = require("body-parser/lib/types/json");
const express = require("express");

const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());

const jsonOne = {
    info:[
    {
    employee_id: 1, 
    employee_name: "Abi", 
    category: "Food", 
    cost:100, 
    bill_no: 101
    },
    {
    employee_id: 2, 
    employee_name: "Jude", 
    category: "Travel", 
    cost:100, 
    bill_no:102
    },
    {
    employee_id: 3, 
    employee_name: "Bob", 
    category: "Food", 
    cost:100, 
    bill_no:103
    },
    {
    employee_id: 1, 
    employee_name: "Abi", 
    category: "Medical", 
    cost:100, 
    bill_no:104
    },
    {
    employee_id: 4, 
    employee_name: "Sean", 
    category: "Materials", 
    cost:100, 
    bill_no:105
    }]}


app.get("/api/Admin", (req, res) =>{
    res.json(jsonOne.info);
})

const filterByUser = ((inputJSON, userID = 1)=>{
    list=[]
    inputJSON.info.forEach((input)=>{if(input.employee_id==userID){list.push(input)}})
    if (list == []){
        return [{}]
    }
    return list
    //return inputJSON.info.filter(employee_id === userID);
})

//const filteredForUser = jsonOne.info.filter(filterByUser)

app.get("/api/User/:userID", (req, res) =>{
    //res.json(filteredForUser);
    const userID = req.params.userID || 1;
    res.json(filterByUser(jsonOne,userID))
})

app.listen(PORT, () => {console.log(`Listening on port: ${PORT}`)});