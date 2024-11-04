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

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
} from "@mui/material";

interface Bill {
  bill_no: number;
  employee_id: number;
  employee_name: string;
  category: string;
  cost: number;
  bill_recipient: string;
  bill_date: string;
  submitted_date: string;
  bill_status: string;
}

interface UserData {
  employee_id: number;
  employee_name: string;
  title: string;
  totalAmount: number;
  allocation: number;
  bills: Bill[];
}

const API_BASE_URL = "http://localhost:8080";

const UserPage: React.FC<{ params: { userID: string } }> = ({ params }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [newAllocation, setNewAllocation] = useState<string>("");

  const userID = params.userID;

  useEffect(() => {
    if (!userID) return;

    setIsLoading(true);
    axios
      .get(`${API_BASE_URL}/api/User/${userID}`)
      .then((response) => {
        setUserData(response.data);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setError(`Failed to fetch user data: ${error.message}`);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userID]);

  const handleAllocationUpdate = () => {
    if (!userData) return;

    const allocationValue = parseFloat(newAllocation);
    if (isNaN(allocationValue) || allocationValue < 0) {
      setError("Invalid allocation value");
      return;
    }

    axios
      .put(`${API_BASE_URL}/api/User/${userData.employee_id}/allocation`, {
        allocation: allocationValue,
      })
      .then((response) => {
        setUserData((prevData) => ({
          ...prevData!,
          allocation: allocationValue,
        }));
        setNewAllocation("");
        setError("");
      })
      .catch((error) => {
        console.error("Error updating allocation:", error);
        setError("Failed to update allocation");
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data available</div>;
  }

  return (
    <div>
      <h1>{userData.employee_name}'s Expense Page</h1>
      <p>Title: {userData.title}</p>
      <p>Total Amount Spent: ${userData.totalAmount.toFixed(2)}</p>
      <p>Current Allocation: ${userData.allocation.toFixed(2)}</p>

      <div>
        <TextField
          label="New Allocation"
          type="number"
          value={newAllocation}
          onChange={(e) => setNewAllocation(e.target.value)}
        />
        <Button onClick={handleAllocationUpdate}>Update Allocation</Button>
      </div>

      <h2>Bills</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Bill No</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Cost</TableCell>
              <TableCell>Recipient</TableCell>
              <TableCell>Bill Date</TableCell>
              <TableCell>Submitted Date</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.bills.map((bill) => (
              <TableRow key={bill.bill_no}>
                <TableCell>{bill.bill_no}</TableCell>
                <TableCell>{bill.category}</TableCell>
                <TableCell>${bill.cost.toFixed(2)}</TableCell>
                <TableCell>{bill.bill_recipient}</TableCell>
                <TableCell>
                  {new Date(bill.bill_date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(bill.submitted_date).toLocaleDateString()}
                </TableCell>
                <TableCell>{bill.bill_status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserPage;
