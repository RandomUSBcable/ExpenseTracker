/*const json = require("body-parser/lib/types/json");
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


app.put('/api/User/:userID/allocation', async (req, res) => {
  try {
    const { userID } = req.params;
    const { allocation } = req.body;

    // Validate input
    if (allocation < 0) {
      return res.status(400).json({ error: 'Allocation cannot be negative' });
    }

    // Update allocation in database
    const [result] = await pool.execute(
      'UPDATE User SET allocation = ? WHERE employee_id = ?',
      [allocation, userID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Fetch updated user data
    const [rows] = await pool.execute(
      'SELECT * FROM User WHERE employee_id = ?',
      [userID]
    );

    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating allocation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

*/


/*
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

*/
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "expense_tracker2"
}).promise(); // Note the .promise() to use async/await

// Connect to database
db.connect()
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to database:', err));

// Helper Functions
const formatDate = (date) => {
  return new Date(date).toISOString().split('T')[0];
};

const validateBill = (bill) => {
  const requiredFields = [
    'category', 
    'cost', 
    'bill_recipient', 
    'bill_date', 
    'submitted_date', 
    'bill_status'
  ];
  
  for (const field of requiredFields) {
    if (!bill[field] && bill[field] !== 0) {
      return false;
    }
  }
  return true;
};

// API Endpoints

// Get User Data with Bills
app.get('/api/User/:userID', (req, res) => {
  const userID = req.params.userID;
  
  // First get user information
  const userQuery = `
    SELECT employee_id, employee_name, title, allocation
    FROM employees 
    WHERE employee_id = ?`;

  // Then get bills information
  const billsQuery = `
    SELECT * FROM bills 
    WHERE employee_id = ?`;

  // Execute user query
  db.query(userQuery, [userID], (err, userResults) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ error: 'Database error' });
    }

    if (userResults.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Execute bills query
    db.query(billsQuery, [userID], (err, billsResults) => {
      if (err) {
        console.error('Error fetching bills:', err);
        return res.status(500).json({ error: 'Database error' });
      }

      // Calculate total amount
      const totalAmount = billsResults.reduce((sum, bill) => sum + bill.cost, 0);

      // Combine the results
      const userData = {
        ...userResults[0],
        totalAmount,
        bills: billsResults
      };

      res.json(userData);
    });
  });
});

// Update allocation
app.put('/api/User/:userID/allocation', (req, res) => {
  const userID = req.params.userID;
  const { allocation } = req.body;

  const query = `
    UPDATE employees 
    SET allocation = ? 
    WHERE employee_id = ?`;

  db.query(query, [allocation, userID], (err, result) => {
    if (err) {
      console.error('Error updating allocation:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Allocation updated successfully' });
  });
});

// Start server
//PORT = process.env.PORT || 8080;

// Update User Allocation

// Submit New Bill
app.post('/api/User/:userID/bills', async (req, res) => {
  const userID = req.params.userID;
  const newBill = req.body;

  try {
    // Validate the new bill data
    if (!validateBill(newBill)) {
      return res.status(400).json({ error: 'Invalid bill data' });
    }

    // Format dates
    const formattedBill = {
      ...newBill,
      employee_id: userID,
      bill_date: formatDate(newBill.bill_date),
      submitted_date: formatDate(newBill.submitted_date)
    };

    // Insert the new bill
    const [result] = await db.query(
      'INSERT INTO bills SET ?',
      formattedBill
    );

    // Fetch the inserted bill
    const [insertedBill] = await db.query(
      'SELECT * FROM bills WHERE bill_no = ?',
      [result.insertId]
    );

    res.status(201).json(insertedBill[0]);
  } catch (error) {
    console.error('Error submitting new bill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get Admin Dashboard Data
app.get("/api/Admin", async (req, res) => {
  try {
    // First get all employees with their allocations
    const [employees] = await db.query(
      "SELECT employee_id, employee_name, title, allocation FROM employees"
    );

    // Then get all bills
    const [bills] = await db.query("SELECT * FROM bills");

    // Calculate user totals and categories
    const users = employees.map(employee => {
      const userBills = bills.filter(bill => bill.employee_id === employee.employee_id);
      const total = userBills.reduce((sum, bill) => sum + (parseFloat(bill.cost) || 0), 0);
      
      return {
        employee_id: employee.employee_id,
        employee_name: employee.employee_name,
        title: employee.title,
        allocation: parseFloat(employee.allocation) || 0, // Convert to number
        total: total,
        bills: userBills.map(bill => ({
          ...bill,
          cost: parseFloat(bill.cost) || 0 // Convert bill costs to numbers
        }))
      };
    });

    // Calculate category totals
    const categories = bills.reduce((acc, bill) => {
      if (!acc[bill.category]) {
        acc[bill.category] = 0;
      }
      acc[bill.category] += parseFloat(bill.cost) || 0;
      return acc;
    }, {});

    res.json({
      bills: bills.map(bill => ({
        ...bill,
        cost: parseFloat(bill.cost) || 0
      })),
      users: users,
      categories: categories
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update allocation endpoint
app.put('/api/User/:userID/allocation', async (req, res) => {
  try {
    const { userID } = req.params;
    const allocation = parseFloat(req.body.allocation);

    if (isNaN(allocation) || allocation < 0) {
      return res.status(400).json({ error: 'Invalid allocation amount' });
    }

    const [result] = await db.query(
      'UPDATE employees SET allocation = ? WHERE employee_id = ?',
      [allocation, userID]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const [rows] = await db.query(
      'SELECT employee_id, employee_name, title, allocation FROM employees WHERE employee_id = ?',
      [userID]
    );

    res.json({
      ...rows[0],
      allocation: parseFloat(rows[0].allocation) || 0
    });
  } catch (error) {
    console.error('Error updating allocation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});