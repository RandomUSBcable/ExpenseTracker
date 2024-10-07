"use client";

import React from "react";
import { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

type billsItemType = {
  employee_id: number;
  employee_name: string;
  category: string;
  cost: number;
  billno: number;
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

const Dashboard = () => {
  const [bills, setBills] = React.useState(SampleBillList);

  useEffect(() => {
    fetch("http://localhost:8080/api/Admin")
      .then((response) => response.json())
      .then((data: AdminInfo) => {
        console.log(data);
        setBills(data.bills);
      });
  }, []);

  let total: number = 0;
  bills.forEach((bill) => {
    total += bill.cost;
  });

  type UserAndTotal = { userID: number; total: number };

  let totalPerUser: UserAndTotal[] = [];
  bills.forEach((bill) => {
    let flag: number = 0;
    totalPerUser.forEach((user) => {
      if (user.userID === bill.employee_id) {
        user.total = user.total + bill.cost;
        flag = 1;
      }
    });
    if (!flag) {
      totalPerUser.push({ userID: bill.employee_id, total: bill.cost });
    }
  });

  let totalPerCategory: { category: string; total: number }[] = [];
  bills.forEach((bill) => {
    let flag: number = 0;
    totalPerCategory.forEach((user) => {
      if (user.category === bill.category) {
        user.total = user.total + bill.cost;
        flag = 1;
      }
    });
    if (!flag) {
      totalPerCategory.push({ category: bill.category, total: bill.cost });
    }
  });

  return (
    <div className="Dashboard">
      <div className="DashboardTotal">Total = {total}</div>
      {totalPerUser.map((user) => {
        return (
          <div className="DashboardTotal">
            {user.userID} : {user.total}
          </div>
        );
      })}
      <PieChart width={600} height={600}>
        <Pie
          data={totalPerCategory}
          cx={300}
          cy={300}
          outerRadius={250}
          fill="#8884d8"
          dataKey="total"
          nameKey="category"
        >
          {totalPerCategory.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={index % 2 === 0 ? "#4da7ef" : "#ffc658"}
            />
          ))}
        </Pie>
      </PieChart>
      {totalPerCategory.map((category) => {
        return (
          <div className="DashboardTotal">
            {category.category} : {category.total}
          </div>
        );
      })}
      <div></div>
    </div>
  );
};

export default Dashboard;
