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

"use client";

type UserInfo = {
  employee_id: number;
  employee_name: string;
  title: string;
  totalAmount: number;
  bills: BillsItemType[];
};

type BillsItemType = {
  employee_id: number;
  employee_name: string;
  category: string;
  cost: number;
  bill_no: number;
  bill_recipient: string;
  bill_date: number;
  submitted_date: number;
  bill_status: string;
};

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Bill from "@/app/components/Bill";
import Calendar from "react-date-picker";

interface PageProps {
  userInfo: UserInfo;
}

const UserPage = ({ userInfo }: PageProps) => {
  const params = useParams();
  const userID = params.userID;
  const [gotdata, setGotData] = useState<UserInfo>();
  const [bills, setBills] = useState<BillsItemType[]>([]);
  const [newBill, setNewBill] = useState({
    category: "",
    cost: 0,
    bill_recipient: "",
    bill_date: new Date(),
    submitted_date: new Date(),
    bill_status: "pending",
  });
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/User/${userID}`)
      .then((response) => response.data)
      .then((data: UserInfo) => {
        console.log(data);
        setGotData(data);
        setBills(data.bills);
      });
  }, []);

  const handleNewBillChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewBill((prevBill) => ({ ...prevBill, [name]: value }));
  };

  const handleBillDateChange = (date: Date) => {
    setNewBill((prevBill) => ({ ...prevBill, bill_date: date }));
  };

  const handleSubmitNewBill = () => {
    if (!newBill.category || !newBill.cost || !newBill.bill_recipient) {
      setError("Please fill in all required information");
      return;
    }
    axios
      .post(`http://localhost:8080/api/User/${userID}/bills`, newBill)
      .then((response) => response.data)
      .then((data: BillsItemType) => {
        setBills((prevBills) => [...prevBills, data]);
        setNewBill({
          category: "",
          cost: 0,
          bill_recipient: "",
          bill_date: new Date(),
          submitted_date: new Date(),
          bill_status: "pending",
        });
        setError("");
      })
      .catch((error) => {
        setError("Error submitting new bill");
      });
  };

  return (
    <div className="main">
      <div className="Header">User </div>
      <div className="Body">
        <div className="Dashboard">
          <div className="Dashboard Total">{gotdata?.totalAmount}</div>
        </div>
        <div className="Bills">
          <div className="BillsSelector"></div>
          <ul className="BillsContainer">
            {gotdata && gotdata.bills.map((bill) => <Bill billsInfo={bill} />)}
            <li className="BillEntry">
              <form>
                <label>Category:</label>
                <input
                  type="text"
                  name="category"
                  value={newBill.category}
                  onChange={handleNewBillChange}
                />
                <br />
                <label>Cost:</label>
                <input
                  type="number"
                  name="cost"
                  value={newBill.cost}
                  onChange={handleNewBillChange}
                />
                <br />
                <label>Bill Recipient:</label>
                <input
                  type="text"
                  name="bill_recipient"
                  value={newBill.bill_recipient}
                  onChange={handleNewBillChange}
                />
                <br />
                <label>Bill Date:</label>
                <Calendar
                  value={newBill.bill_date}
                  format="yyyy-MM-dd"
                  minDate={new Date("2022-01-01")}
                  maxDate={new Date("2025-12-31")}
                />
                <br />
                <button type="button" onClick={handleSubmitNewBill}>
                  Submit New Bill
                </button>
                {error && <div style={{ color: "red" }}>{error}</div>}
              </form>
            </li>
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
