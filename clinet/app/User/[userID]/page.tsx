/*
import Link from "next/link";

export default function Home() {
  return (
    <div className="main">
      <div className="Header">User</div>
      <div className="Body">
        <div className="TimeSelector">
          <ul className="TimeSelectorOptions">
            {
              <li className="TimeSelectorOptionSingle">past 7 days</li>
              <li className="TimeSelectorOptionSingle">past 28 days</li>
              <li className="TimeSelectorOptionSingle">this week</li>
              <li className="TimeSelectorOptionSingle">this month</li>
              }
          </ul>
        </div>
        <div className="Dashboard">
          <div className="Dashboard Total">100</div>
        </div>

        <div className="Bills">
          <div className="BillsSelector"></div>
          <ul className="BillsContainer">
            <li className="BillSingle">Bill 1</li>
            <li className="BillSingle">Bill 2</li>
            <li className="BillSingle">Bill 3</li>
            <li className="BillSingle">Bill 4</li>
            <li className="BillEntry"> Enter info</li>
          </ul>
        </div>
      </div>
      <div className="Footer">
        <ul className="FooterList">
          <li>
            <Link href="./Login">HOME</Link>
          </li>
          <li>
            <Link href="./Login">Log Out</Link>
          </li>
          <li>Back to top</li>
          <li>HELP</li>
        </ul>
      </div>
    </div>
  );
}
*/

/*
"use client";
import axios, { AxiosResponse, AxiosError } from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { userInfo } from "os";

type UsersItemType = {
  employee_id: number;
  employee_name: string;
  title: string;
  total: number;
};

type BillsItemType = {
  bill_no: number;
  category: string;
  cost: number;
  bill_date: number;
  submitted_date: number;
  bill_status: string;
};

type UserInfo = {
  bills: BillsItemType[];
  totalAmount: number;
  categoryTotals: { category: number };
};

type ApiResponse<T> = AxiosResponse<T>;
type ApiError = AxiosError;

const UserPage = (props: any) => {
  let SampleBillList: BillsItemType[] = [];

  const [bills, setBills] = React.useState(SampleBillList);
  const [filteredBills, setFilteredBills] = React.useState(bills);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [filterRecipient, setFilterRecipient] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState("");
  const [filterAmountMin, setFilterAmountMin] = React.useState(0);
  const [filterAmountMax, setFilterAmountMax] = React.useState(Infinity);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/User/${userID}")
      .then((response) => response.json())
      .then((data: UserInfo) => {
        console.log(data);
        setBills(data.bills);
        setFilteredBills(data.bills);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="main">
      <div className="Header"></div>
      <div className="Body">
        <div className="Dashboard">
          <div className="Dashboard Total">{userInfo.totalAmount}</div>
        </div>
        <div className="Bills">
          <div className="BillsSelector"></div>
          <ul className="BillsContainer">
            {userInfo.bills.map((bill) => (
              <li key={bill.bill_no} className="BillSingle">
                <p>Bill No: {bill.bill_no}</p>
                <p>Category: {bill.category}</p>
                <p>Cost: {bill.cost}</p>
                <p>Bill Date: {bill.bill_date}</p>
                <p>Submitted Date: {bill.submitted_date}</p>
                <p>Bill Status: {bill.bill_status}</p>
              </li>
            ))}
            <li className="BillEntry">Enter info</li>
          </ul>
        </div>
      </div>
      <div className="Footer">
        <ul className="FooterList">
          <li>
            <Link href="./Login">HOME</Link>
          </li>
          <li>
            <Link href="./Login">Log Out</Link>
          </li>
          <li>Back to top</li>
          <li>HELP</li>
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
*/
/*
"use client";

type UserInfo = {
  employee_id: number;
  employee_name: string;
  title: string;
  totalAmount: number;
  allocation: number;
  bills: BillsItemType[];
};

type BillsItemType = {
  employee_id: number;
  employee_name: string;
  category: string;
  cost: number;
  bill_no: number;
  bill_recipient: string;
  bill_date: Date;
  submitted_date: Date;
  bill_status: string;
};

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Bill from "@/app/components/Bill";
import Calendar from "react-date-picker";
import BillEntry from "./BillEntry";

const UserPage = () => {
  const params = useParams();
  const userID = params.userID;
  const [gotdata, setGotData] = useState<UserInfo | null>(null);
  const [bills, setBills] = useState<BillsItemType[]>([]);
  const [error, setError] = useState<string>("");

  const [newBill, setNewBill] = useState<BillsItemType>({
    employee_id: typeof userID === "string" ? parseInt(userID) : 0,
    employee_name: "",
    category: "",
    cost: 0,
    bill_no: 0,
    bill_recipient: "",
    bill_date: new Date(),
    submitted_date: new Date(),
    bill_status: "pending",
  });

  useEffect(() => {
    if (!userID) return;

    axios
      .get(`http://localhost:8080/api/User/${userID}/bills`)
      .then((response) => {
        setGotData(response.data);
        setBills(response.data.bills);
        setError("");
      })
      .catch((error) => {
        setError("Error fetching user data");
        console.error("Error:", error);
      });
  }, []);

  const handleSubmitNewBill = (newBill: BillsItemType) => {
    if (!newBill.category || !newBill.cost || !newBill.bill_recipient) {
      setError("Please fill in all required information");
      return;
    }

    axios
      .post(`http://localhost:8080/api/User/${userID}/bills`, newBill)
      .then((response) => {
        setBills((prevBills) => [...prevBills, response.data]);
        setNewBill({
          employee_id: typeof userID === "string" ? parseInt(userID) : 0,
          employee_name: "",
          category: "",
          cost: 0,
          bill_no: 0,
          bill_recipient: "",
          bill_date: new Date(),
          submitted_date: new Date(),
          bill_status: "pending",
        });
        setError("");
      })
      .catch((error) => {
        setError("Error submitting new bill");
        console.error("Error:", error);
      });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main">
      <div className="Header">User</div>
      <div className="Body">
        <div className="Dashboard">
          <div className="Dashboard Total">{gotdata?.totalAmount || 0}</div>
        </div>
        <div className="Bills">
          <div className="BillsSelector"></div>
          <ul className="BillsContainer">
            {gotdata &&
              gotdata?.bills.map((bill) => (
                <Bill key={bill.bill_no} billsInfo={bill} />
              ))}
            <BillEntry
              userID={userID.toString()}
              setBills={() => handleSubmitNewBill(newBill)}
            />
          </ul>
        </div>
      </div>
      <div className="Footer">
        <ul className="FooterList">
          <li>
            <Link href="./Login">HOME</Link>
          </li>
          <li>
            <Link href="./Login">Log Out</Link>
          </li>
          <li>Back to top</li>
          <li>HELP</li>
        </ul>
      </div>
    </div>
  );
};

export default UserPage;
*/

/*
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface Bill {
  bill_id: number;
  employee_id: number;
  category: string;
  description: string;
  cost: number;
  date: string;
  bill_status: string;
  submitted_date: string;
}

interface User {
  employee_id: number;
  employee_name: string;
  title: string;
  allocation: number;
  total: number;
  bills: Bill[];
}

type data = User;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const CATEGORIES = ["Food", "Travel", "Medical", "Office Supplies", "Other"];

const page: React.FC = () => {
  console.log("UserPage component is being loaded");
  const params = useParams() as { userID: string };
  const userId = params.userID;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openNewBill, setOpenNewBill] = useState(false);
  const [newBill, setNewBill] = useState({
    category: "",
    description: "",
    cost: "",
    date: new Date().toISOString().split("T")[0],
    bill_status: "Pending",
  });

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        console.log("Fetching data for user:", userId);
        const response = await fetch(
          `http://localhost:8080/api/User/${userId}/bills`
        );
        setUser(await response.json());
        setError(null);
      } catch (err) {
        console.error("Fetching error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        console.log("loading");
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleNewBillSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/User/${userId}/bills`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...newBill,
            cost: parseFloat(newBill.cost),
            submitted_date: new Date().toISOString().split("T")[0],
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit bill");

      setOpenNewBill(false);
      //fetchUserData(); // Refresh data

      // Reset form
      setNewBill({
        category: "",
        description: "",
        cost: "",
        date: new Date().toISOString().split("T")[0],
        bill_status: "Pending",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit bill");
    }
  };

  const handleNewBillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBill((prev) => ({ ...prev, [name]: value }));
  };

  // Prepare data for pie chart
  const getCategoryData = () => {
    if (!user?.bills) return [];

    const categoryTotals = user.bills.reduce((acc, bill) => {
      acc[bill.category] = (acc[bill.category] || 0) + bill.cost;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error || !user) {
    return (
      <Container>
        <Typography color="error" variant="h6">
          {error || "User not found"}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {user.employee_name}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {user.title}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Financial Overview
              </Typography>
              <Typography>Allocation: ${user.allocation.toFixed(2)}</Typography>
              <Typography>Total Spent: ${user.total.toFixed(2)}</Typography>
              <Typography>
                Remaining: ${(user.allocation - user.total).toFixed(2)}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, height: 300 }}>
              <Typography variant="h6" gutterBottom>
                Expenses by Category
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getCategoryData()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {getCategoryData().map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Bills History</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenNewBill(true)}
              >
                Add New Bill
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.bills.map((bill) => (
                    <TableRow key={bill.bill_id}>
                      <TableCell>
                        {new Date(bill.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{bill.category}</TableCell>
                      <TableCell>{bill.description}</TableCell>
                      <TableCell align="right">
                        ${bill.cost.toFixed(2)}
                      </TableCell>
                      <TableCell>{bill.bill_status}</TableCell>
                      <TableCell>{bill.bill_status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={openNewBill} onClose={() => setOpenNewBill(false)}>
        <DialogTitle>Add New Bill</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Category"
            name="category"
            value={newBill.category}
            onChange={handleNewBillChange}
            fullWidth
            margin="normal"
          >
            {CATEGORIES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description"
            name="description"
            value={newBill.description}
            onChange={handleNewBillChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cost"
            name="cost"
            type="number"
            value={newBill.cost}
            onChange={handleNewBillChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={newBill.date}
            onChange={handleNewBillChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewBill(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleNewBillSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default page;
*/

"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Box,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

interface Bill {
  bill_id: number;
  employee_id: number;
  category: string;
  description: string;
  cost: number;
  date: string;
  bill_status: string;
  submitted_date: string;
}

interface User {
  employee_id: number;
  employee_name: string;
  title: string;
  allocation: number;
  total: number;
  bills: Bill[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];
const CATEGORIES = ["Food", "Travel", "Medical", "Office Supplies", "Other"];

const page: React.FC = () => {
  const params = useParams() as { userID: string };
  const userId = params.userID;

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openNewBill, setOpenNewBill] = useState(false);
  const [newBill, setNewBill] = useState({
    category: "",
    description: "",
    cost: "",
    date: new Date().toISOString().split("T")[0],
    bill_status: "Pending",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Using the admin API endpoint instead of the user endpoint
        const response = await axios.get("http://localhost:8080/api/Admin");
        console.log("Received admin data:", response.data);

        // Find the specific user from the users array
        const userData = response.data.users.find(
          (user: User) => user.employee_id.toString() === userId
        );
        if (userData) {
          setUser(userData);
          console.log("Found user data:", userData);
        } else {
          setError("User not found");
        }
      } catch (err) {
        console.error("Fetching error:", err);
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleNewBillSubmit = async () => {
    try {
      // Using the admin API endpoint for submitting new bills
      const response = await axios.post(
        `http://localhost:8080/api/User/${userId}/bills`,
        {
          ...newBill,
          cost: parseFloat(newBill.cost),
          submitted_date: new Date().toISOString().split("T")[0],
        }
      );

      // Refresh user data after submitting new bill
      const updatedUserResponse = await axios.get(
        `http://localhost:8080/api/admin/users/${userId}`
      );
      setUser(updatedUserResponse.data);

      setOpenNewBill(false);
      setNewBill({
        category: "",
        description: "",
        cost: "",
        date: new Date().toISOString().split("T")[0],
        bill_status: "Pending",
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit bill");
    }
  };

  const handleNewBillChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewBill((prev) => ({ ...prev, [name]: value }));
  };

  const getCategoryData = () => {
    if (!user?.bills) return [];

    const categoryTotals = user.bills.reduce((acc, bill) => {
      acc[bill.category] = (acc[bill.category] || 0) + bill.cost;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
  };

  if (loading) {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error || !user) {
    return (
      <Container>
        <Typography color="error" variant="h6">
          {error || "User not found"}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              {user.employee_name}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              {user.title}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Financial Overview
              </Typography>
              <Typography>Allocation: ${user.allocation.toFixed(2)}</Typography>
              <Typography>Total Spent: ${user.total.toFixed(2)}</Typography>
              <Typography>
                Remaining: ${(user.allocation - user.total).toFixed(2)}
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 2, height: 300 }}>
              <Typography variant="h6" gutterBottom>
                Expenses by Category
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getCategoryData()}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {getCategoryData().map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="h6">Bills History</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenNewBill(true)}
              >
                Add New Bill
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {user.bills.map((bill) => (
                    <TableRow key={bill.bill_id}>
                      <TableCell>
                        {new Date(bill.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{bill.category}</TableCell>
                      <TableCell>{bill.description}</TableCell>
                      <TableCell align="right">
                        ${bill.cost.toFixed(2)}
                      </TableCell>
                      <TableCell>{bill.bill_status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={openNewBill} onClose={() => setOpenNewBill(false)}>
        <DialogTitle>Add New Bill</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Category"
            name="category"
            value={newBill.category}
            onChange={handleNewBillChange}
            fullWidth
            margin="normal"
          >
            {CATEGORIES.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Description"
            name="description"
            value={newBill.description}
            onChange={handleNewBillChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cost"
            name="cost"
            type="number"
            value={newBill.cost}
            onChange={handleNewBillChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={newBill.date}
            onChange={handleNewBillChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenNewBill(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleNewBillSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default page;
