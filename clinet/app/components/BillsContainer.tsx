/*
"use client";
import React, { useEffect, useState } from "react";
import Bill from "./Bill";

type billsItemType = {
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

type UsersItemType = {
  user: string;
  userId: number;
};

type AdminInfo = {
  bills: billsItemType[];
  users: UsersItemType[];
};

let SampleBillList: billsItemType[] = [];

const BillsContainer = () => {
  const [bills, setBills] = React.useState(SampleBillList);

  useEffect(() => {
    fetch("http://localhost:8080/api/Admin")
      .then((response) => response.json())
      .then((data: AdminInfo) => {
        console.log(data);
        setBills(data.bills);
      });
  }, []);

  return (
    <ul className="BillsContainer">
      {bills.map((billsItem: billsItemType) => (
        <Bill billsInfo={billsItem} />
      ))}
    </ul>
  );
};

export default BillsContainer;

*/

"use client";
import React, { useEffect, useState } from "react";
import Bill from "./Bill";

type billsItemType = {
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

type UsersItemType = {
  user: string;
  total: number;
};

type CategoryItemType = {
  category: string;
  total: number;
};

type AdminInfo = {
  bills: billsItemType[];
  users: UsersItemType[];
  categories: CategoryItemType[];
};

let SampleBillList: billsItemType[] = [];

const BillsContainer = () => {
  const [bills, setBills] = React.useState(SampleBillList);
  const [filteredBills, setFilteredBills] = React.useState(bills);
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");
  const [filterRecipient, setFilterRecipient] = React.useState("");
  const [filterCategory, setFilterCategory] = React.useState("");
  const [filterUserId, setFilterUserId] = React.useState(0);
  const [filterAmountMin, setFilterAmountMin] = React.useState(0);
  const [filterAmountMax, setFilterAmountMax] = React.useState(Infinity);

  useEffect(() => {
    fetch("http://localhost:8080/api/Admin")
      .then((response) => response.json())
      .then((data: AdminInfo) => {
        console.log(data);
        setBills(data.bills);
        setFilteredBills(data.bills);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSort = () => {
    if (sortOrder === "asc") {
      setFilteredBills([...filteredBills].sort((a, b) => a.cost - b.cost));
      setSortOrder("desc");
    } else {
      setFilteredBills([...filteredBills].sort((a, b) => b.cost - a.cost));
      setSortOrder("asc");
    }
  };

  const handleFilter = () => {
    let filtered = bills;
    if (filterRecipient) {
      filtered = filtered.filter(
        (bill) => bill.bill_recipient === filterRecipient
      );
    }
    if (filterCategory) {
      filtered = filtered.filter((bill) => bill.category === filterCategory);
    }
    if (filterUserId) {
      filtered = filtered.filter((bill) => bill.employee_id === filterUserId);
    }
    if (filterAmountMin || filterAmountMax) {
      filtered = filtered.filter(
        (bill) => bill.cost >= filterAmountMin && bill.cost <= filterAmountMax
      );
    }
    setFilteredBills(filtered);
  };

  const uniqueRecipients = Array.from(
    new Set(bills.map((bill) => bill.bill_recipient))
  );
  const uniqueCategories = Array.from(
    new Set(bills.map((bill) => bill.category))
  );
  const uniqueUserIds = Array.from(
    new Set(bills.map((bill) => bill.employee_id))
  );

  return (
    <div>
      <button onClick={handleSort}>
        Sort by cost {sortOrder === "asc" ? "↑" : "↓"}
      </button>
      <select
        value={filterRecipient}
        onChange={(e) => setFilterRecipient(e.target.value)}
      >
        <option value="">Select recipient</option>
        {uniqueRecipients.map((recipient) => (
          <option key={recipient} value={recipient}>
            {recipient}
          </option>
        ))}
      </select>
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">Select category</option>
        {uniqueCategories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <select
        value={filterUserId}
        onChange={(e) => setFilterUserId(Number(e.target.value))}
      >
        <option value="">Select user ID</option>
        {uniqueUserIds.map((userId) => (
          <option key={userId} value={userId}>
            {userId}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={filterAmountMin}
        onChange={(e) => setFilterAmountMin(Number(e.target.value))}
        placeholder="Min amount"
      />
      <input
        type="number"
        value={filterAmountMax}
        onChange={(e) => setFilterAmountMax(Number(e.target.value))}
        placeholder="Max amount"
      />
      <button onClick={handleFilter}>Apply filters</button>
      <ul className="BillsContainer">
        {filteredBills.map((billsItem: billsItemType) => (
          <Bill billsInfo={billsItem} />
        ))}
      </ul>
    </div>
  );
};

export default BillsContainer;
