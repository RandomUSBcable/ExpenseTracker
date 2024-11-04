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

/*

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
  allocation: number;
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

  const handleAllocation = (userId: number, amount: number) => {
    fetch("http://localhost:8080/api/allocate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, amount }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Optionally update the local state if needed
        console.log("Allocation updated:", data);
      })
      .catch((error) => {
        console.error("Error allocating amount:", error);
      });
  };

  // In the render method
  {
    users.map((user) => (
      <div key={user.employee_id}>
        <h3>{user.employee_id}</h3>
        <p>Total Spent: {user.total}</p>
      </div>
    ));
  }

  const handleCreateUser = () => {
    const newUserId = Math.max(...users.map((user) => user.employee_id)) + 1;
    const newUserData: UsersItemType = {
      employee_id: newUserId,
      employee_name: newUser.employee_name,
      title: newUser.title,
      total: 0,
      allocation: 0,
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



*/

"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import UserCard from "./UserCard";
import { styled } from "@mui/material/styles";

interface Bill {
  bill_no: number;
  employee_id: number;
  category: string;
  cost: number;
  bill_recipient: string;
  bill_date: string;
  submitted_date: string;
  bill_status: string;
}

interface User {
  employee_id: number;
  employee_name: string;
  title: string;
  allocation: number;
  bills: Bill[];
  total: number;
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface UserData {
  employee_id: number;
  employee_name: string;
  title: string;
  allocation: number;
  total: number;
  bills: Bill[];
}

const UsersContainer: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      console.log("Starting to fetch users..."); // Debug log
      try {
        // First API call to get all users
        console.log("Fetching from Admin endpoint..."); // Debug log
        const response = await fetch("http://localhost:8080/api/Admin");

        if (!response.ok) {
          throw new Error(
            `Admin endpoint failed with status: ${response.status}`
          );
        }

        const adminData = await response.json();
        console.log("Admin Data received:", adminData); // Debug log

        if (!adminData.users || !Array.isArray(adminData.users)) {
          console.log("Invalid admin data structure:", adminData); // Debug log
          throw new Error("Invalid user data received");
        }

        // Set users directly from admin data first
        const basicUsers = adminData.users.map((user: any) => ({
          employee_id: user.employee_id,
          employee_name: user.employee_name,
          title: user.title || "Employee",
          allocation: user.allocation,
          total: user.total,
          bills: [user.bills],
        }));

        setUsers(basicUsers);
        setLoading(false); // Show basic data first

        // Then fetch detailed data
        console.log("Fetching detailed user data..."); // Debug log
        const detailedUsers = await Promise.all(
          adminData.users.map(async (user: any) => {
            console.log(`Fetching details for user ${user.employee_id}`); // Debug log
            try {
              const userResponse = await fetch(
                `http://localhost:8080/api/User/${user.employee_id}`
              );
              if (!userResponse.ok) {
                console.log(`Failed to fetch user ${user.employee_id}`); // Debug log
                return null;
              }
              const userData = await userResponse.json();
              console.log(
                `Received data for user ${user.employee_id}:`,
                userData
              ); // Debug log
              return {
                ...userData,
                bills: userData.bills || [],
                totalAmount:
                  userData.totalAmount || 0
                    ? userData.bills.reduce(
                        (sum: number, bill: Bill) => sum + (bill.cost || 0),
                        0
                      )
                    : 0,
                allocation: userData.allocation || 0,
              };
            } catch (error) {
              console.error(`Error fetching user ${user.employee_id}:`, error);
              return null;
            }
          })
        );

        // Filter out any null values from failed requests
        const validUsers = detailedUsers.filter(
          (user): user is User => user !== null
        );
        console.log("Final detailed users:", validUsers); // Debug log

        if (validUsers.length > 0) {
          setUsers(validUsers);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err instanceof Error
            ? err.message
            : "An error occurred while fetching data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleAllocationUpdate = async (
    userId: number,
    newAllocation: number
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/User/${userId}/allocation`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ allocation: newAllocation }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update allocation");
      }

      // Update the local state with the new allocation
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.employee_id === userId
            ? { ...user, allocation: newAllocation }
            : user
        )
      );
    } catch (err) {
      console.error("Error updating allocation:", err);
      setError(
        err instanceof Error ? err.message : "Failed to update allocation"
      );
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading users data...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Users Overview
      </Typography>
      <Grid container spacing={3}>
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.employee_id}>
            <UserCard user={user} onAllocationUpdate={handleAllocationUpdate} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UsersContainer;
