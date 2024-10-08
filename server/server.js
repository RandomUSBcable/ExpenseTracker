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

const getBillsFromDatabase = () => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM bills";
      db.query(query, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  };
  
app.get("/api/Admin", async (req, res) => {
    try {
        const bills = await getBillsFromDatabase();
        
    } catch (err) {
        console.error(err);
        bills = BillData.info;
        //res.status(500).json({ message: "Error retrieving bills" });
    }

    const users = [];
    const categories = {};

    bills.forEach(bill => {
        if (!users[bill.employee_id-1]) {
            users[bill.employee_id-1] = { employee_id: bill.employee_id, employee_name: bill.employee_name, total: 0 };
          }
          users[bill.employee_id-1].total += bill.cost;
    
          if (!categories[bill.category]) {
            categories[bill.category] = 0;
          }
          categories[bill.category] += bill.cost;
    });

    res.json({
    bills: bills,
    users: users,
    categories: categories
    });
});

const filterByUser   = (inputJSON, userID) => {
    const filteredBills = inputJSON.filter(item => item.employee_id == userID);
    let totalAmount = 0;
    const categoryTotals = {};

    if (filteredBills.length > 0) {
        totalAmount = filteredBills.reduce((acc, bill) => acc + bill.cost, 0);
        filteredBills.forEach(bill => {
        if (!categoryTotals[bill.category]) {
            categoryTotals[bill.category] = 0;
        }
        categoryTotals[bill.category] += bill.cost;
        });
    }
    return { bills: filteredBills, totalAmount, categoryTotals };
}
//const filteredForUser = jsonOne.info.filter(filterByUser)

app.get("/api/User/:userID", (req, res) =>{
    //res.json(filteredForUser);
    const userID = req.params.userID || 1;
    res.json(filterByUser(BillData.info,userID))
})

const validateBill = (bill) => {
    const requiredFields = ['employee_id', 'employee_name', 'category', 'cost', 'bill_no', 'bill_recipient', 'bill_date', 'submitted_date', 'bill_status'];
    for (const field of requiredFields) {
      if (!bill[field] || bill[field] === '') {
        return false;
      }
    }
    return true;
  };
  
app.post('/api/Bills', (req, res) => {
    const bill = req.body;
    if (!validateBill(bill)) {
      res.status(400).json({ message: 'Invalid bill data' });
      return;
    }
  
    const query = 'INSERT INTO bills SET ?';
    db.query(query, bill, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Error storing bill' });
      } else {
        res.json({ message: 'Bill stored successfully' });
      }
    });
  });
  


app.listen(PORT, () => {console.log(`Listening on port: ${PORT}`)});