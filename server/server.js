const json = require("body-parser/lib/types/json");
const express = require("express");
const mysql = require("mysql");

const cors = require("cors");

const app = express();
const PORT = 8080;

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "expense_tracker"
  });
  
  // Connect to database
db.connect((err) => {
    if (err) {
      console.error('error connecting:', err);
      return;
    }
    console.log('connected as id ' + db.threadId);
  });
  
  // Add middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const BillData = {
    info:[
    {
    employee_id: 1, 
    employee_name: "Abi", 
    category: "Food", 
    cost:1000, 
    bill_no: 101,
    bill_recipient:"SaravanaBhavan",
    bill_date:20240810,
    submitted_date:20240811,
    bill_status: "reinbursed"
    },
    {
    employee_id: 2, 
    employee_name: "Jude", 
    category: "Travel", 
    cost:10000, 
    bill_no:102,
    bill_recipient:"Air India",
    bill_date:20240810,
    submitted_date:20240811,
    bill_status: "reinbursed" 
    },
    {
    employee_id: 3, 
    employee_name: "Bob", 
    category: "Food", 
    cost:2000, 
    bill_no:103,
    bill_recipient:"Anjappar",
    bill_date:20240810,
    submitted_date:20240811,
    bill_status: "reinbursed" 
    },
    {
    employee_id: 1, 
    employee_name: "Abi", 
    category: "Medical", 
    cost:500, 
    bill_no:104,
    bill_recipient:"Global Hospitals",
    bill_date:20240810,
    submitted_date:20240811,
    bill_status: "reinbursed" 
    },
    {
    employee_id: 4, 
    employee_name: "Sean", 
    category: "Materials", 
    cost:100, 
    bill_no:105,
    bill_recipient:"SM Stationary",
    bill_date:20240810,
    submitted_date:20240811,
    bill_status: "reinbursed" 
    }]}

const UserData = {
    info: 
    [{
        employee_id: 1,
        employee_name:"Abi",
    },{
        employee_id:2, 
        employee_name:"Jude"
    },{
        employee_id:2, 
        employee_name:"Bob"
    },{
        employee_id:4,
        employee_name:"Sean"
    }]
}

const AllocationData ={
    info:
    [{
        employee_id: 1,
        start_date:0,
        end_date:0,
        amount: 500
    }]
}

const AdminData ={
bills: BillData.info,
users: UserData.info,
} 

app.get("/api/Admin", (req, res) =>{
    res.json(AdminData);
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
    res.json(filterByUser(BillData,userID))
})

app.listen(PORT, () => {console.log(`Listening on port: ${PORT}`)});