/** 
"use client";
import React, { useEffect, useState } from "react";
import User from "./User";

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
  employee_id: number;
  employee_name: string;
};

type AdminInfo = {
  bills: billsItemType[];
  users: UsersItemType[];
};

let SampleUsersList: UsersItemType[] = [];

const UsersContainer = () => {
  const [users, setUsers] = React.useState(SampleUsersList);

  useEffect(() => {
    fetch("http://localhost:8080/api/Admin")
      .then((response) => response.json())
      .then((data: AdminInfo) => {
        console.log(data);
        setUsers(data.users);
      });
  }, []);

  return (
    <ul className="UsersContainer">
      {users.map((UserItem: UsersItemType) => (
        <User userInfo={UserItem} />
      ))}
    </ul>
  );
};

export default UsersContainer;
*/

"use client";
import React, { useEffect, useState } from "react";
import User from "./User";

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
  employee_id: number;
  employee_name: string;
};

type AdminInfo = {
  bills: billsItemType[];
  users: UsersItemType[];
};

let SampleUsersList: UsersItemType[] = [];

const UsersContainer = () => {
  const [users, setUsers] = React.useState(SampleUsersList);
  const [bills, setBills] = React.useState<billsItemType[]>([]);
  const [sortCriteria, setSortCriteria] = React.useState("alphabetical");

  useEffect(() => {
    fetch("http://localhost:8080/api/Admin")
      .then((response) => response.json())
      .then((data: AdminInfo) => {
        console.log(data);
        setUsers(data.users);
        setBills(data.bills);
      });
  }, []);

  const handleSort = (criteria: string) => {
    setSortCriteria(criteria);
  };

  const sortedUsers = () => {
    if (sortCriteria === "alphabetical") {
      return [...users].sort((a, b) =>
        a.employee_name.localeCompare(b.employee_name)
      );
    } else if (sortCriteria === "totalSpent") {
      const usersWithTotalSpent = users.map((user) => {
        const totalSpent = bills
          .filter((bill) => bill.employee_id === user.employee_id)
          .reduce((acc, bill) => acc + bill.cost, 0);
        return { ...user, totalSpent };
      });
      return [...usersWithTotalSpent].sort(
        (a, b) => b.totalSpent - a.totalSpent
      );
    }
    return users;
  };

  return (
    <div>
      <button onClick={() => handleSort("alphabetical")}>Sort by Name</button>
      <button onClick={() => handleSort("totalSpent")}>
        Sort by Total Spent
      </button>
      <ul className="UsersContainer">
        {sortedUsers().map((UserItem: UsersItemType) => (
          <User userInfo={UserItem} />
        ))}
      </ul>
    </div>
  );
};

export default UsersContainer;
