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
  total: number;
};

interface UserWithTotalSpent extends UsersItemType {
  totalSpent: number;
}

type CategoryItemType = {
  category: string;
  total: number;
};

type AdminInfo = {
  bills: billsItemType[];
  users: UsersItemType[];
  categories: CategoryItemType[];
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
      const usersWithTotalSpent: UserWithTotalSpent[] = users.map((user) => {
        const totalSpent = bills
          .filter((bill) => bill.employee_id === user.employee_id)
          .reduce((acc, bill) => acc + bill.cost, 0);
        return { ...user, totalSpent };
      });
      return [...usersWithTotalSpent].sort(
        (a, b) => b.totalSpent - a.totalSpent
      );
    }
    console.log(users);
    return users;
  };

  return (
    <div>
      <button onClick={() => handleSort("alphabetical")}>Sort by Name</button>
      <button onClick={() => handleSort("totalSpent")}>
        Sort by Total Spent
      </button>
      <ul className="UsersContainer">
        {sortedUsers() &&
          sortedUsers().map((UserItem: UsersItemType) => (
            <User key={UserItem.employee_id} userInfo={UserItem} />
          ))}
      </ul>
    </div>
  );
};

export default UsersContainer;


"use client";
import React, { useEffect, useState } from "react";
import User from "./User";

interface Bill {
  employee_id: number;
  cost: number;
}
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

const UsersContainer: React.FC = () => {
  const [users, setUsers] = useState<UsersItemType[]>([]);
  const [bills, setBills] = useState<billsItemType[]>([]);
  const [sortCriteria, setSortCriteria] = useState<
    "alphabetical" | "totalSpent"
  >("alphabetical");

  useEffect(() => {
    fetch("http://localhost:8080/api/Admin")
      .then((response) => response.json())
      .then((data: AdminInfo) => {
        console.log(data);
        setUsers(data.users);
        setBills(data.bills);
      });
  }, []);

  const sortedUsers = () => {
    if (sortCriteria === "alphabetical") {
      return [...users].sort((a, b) =>
        a.employee_name.localeCompare(b.employee_name)
      );
    } else if (sortCriteria === "totalSpent") {
      return [...users].sort((a, b) => b.total - a.total);
    }
    return users;
  };

  setUsers(sortedUsers());

  return (
    <div>
      <h1>Users</h1>
      <select
        value={sortCriteria}
        onChange={(e) =>
          setSortCriteria(e.target.value as "alphabetical" | "totalSpent")
        }
      >
        <option value="alphabetical">Alphabetical</option>
        <option value="totalSpent">Total Spent</option>
      </select>
      <ul>
        {users &&
          users.map((userItem) => (
            <User key={userItem.employee_id} userInfo={userItem} />
          ))}
      </ul>
    </div>
  );
};

export default UsersContainer;
*/

"use client";
import React, { useState, useEffect } from "react";
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
  title: string;
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

const sampleUsers: UsersItemType[] = [];

const UsersContainer: React.FC = () => {
  const [users, setUsers] = useState(sampleUsers);
  const [bills, setBills] = useState<billsItemType[]>([]);
  const [sortCriteria, setSortCriteria] = useState<
    "alphabetical" | "totalSpent"
  >("alphabetical");
  const [newUser, setNewUser] = useState<{
    employee_id: number;
    employee_name: string;
    title: string;
  }>({
    employee_id: 0,
    employee_name: "",
    title: "",
  });

  useEffect(() => {
    fetch("http://localhost:8080/api/Admin")
      .then((response) => response.json())
      .then((data: AdminInfo) => {
        console.log(data.users, "this");
        setUsers(data.users);
        setBills(data.bills);
      });
  }, []);

  const handleSort = (criteria: "alphabetical" | "totalSpent") => {
    setSortCriteria(criteria);
  };

  const sortedUsers = () => {
    if (sortCriteria === "alphabetical") {
      return [...users].sort((a, b) =>
        a.employee_name.localeCompare(b.employee_name)
      );
    } else if (sortCriteria === "totalSpent") {
      return [...users].sort((a, b) => {
        const totalSpentA = bills
          .filter((bill) => bill.employee_id === a.employee_id)
          .reduce((acc, bill) => acc + bill.cost, 0);
        const totalSpentB = bills
          .filter((bill) => bill.employee_id === b.employee_id)
          .reduce((acc, bill) => acc + bill.cost, 0);
        return totalSpentB - totalSpentA;
      });
    }
    return users;
  };

  const handleCreateUser = () => {
    const newUserId = Math.max(...users.map((user) => user.employee_id)) + 1;
    const newUserData: UsersItemType = {
      employee_id: newUserId,
      employee_name: newUser.employee_name,
      title: newUser.title,
      total: 0,
    };
    setUsers([...users, newUserData]);
    setNewUser({ employee_id: 0, employee_name: "", title: "" });
  };

  return (
    <div>
      <h1>Users</h1>
      <select
        value={sortCriteria}
        onChange={(e) =>
          handleSort(e.target.value as "alphabetical" | "totalSpent")
        }
      >
        <option value="alphabetical">Alphabetical</option>
        <option value="totalSpent">Total Spent</option>
      </select>
      <form>
        <label>
          Create new user:
          <input
            type="text"
            value={newUser.employee_name}
            onChange={(e) =>
              setNewUser({ ...newUser, employee_name: e.target.value })
            }
            placeholder="Name"
          />
        </label>
        <br />
        <label>
          <input
            type="text"
            value={newUser.title}
            onChange={(e) => setNewUser({ ...newUser, title: e.target.value })}
            placeholder="Title"
          />
        </label>
        <br />
        <button type="button" onClick={handleCreateUser}>
          Create
        </button>
      </form>
      <ul>
        {sortedUsers().map((userItem) => (
          <User key={userItem.employee_id} userInfo={userItem} />
        ))}
      </ul>
    </div>
  );
};

export default UsersContainer;
