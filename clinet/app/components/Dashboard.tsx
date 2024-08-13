"use client";

import React from "react";
import { useEffect, useState } from "react";

type billsItemType = {
  employee_id: number;
  employee_name: string;
  category: string;
  cost: number;
  billno: number;
};

let SampleBillList: billsItemType[] = [];

function Dashboard() {
  const [bills, setBills] = React.useState(SampleBillList);

  useEffect(() => {
    fetch("http://localhost:8080/api/Admin")
      .then((response) => response.json())
      .then((data: billsItemType[]) => {
        console.log(data);
        setBills(data);
      });
  });

  let total: number = 0;
  bills.forEach((bill) => {
    total += bill.cost;
  });

  let totalPerUser: { userID: number; total: number }[] = [];
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
      {totalPerCategory.map((user) => {
        return (
          <div className="DashboardTotal">
            {user.category} : {user.total}
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
