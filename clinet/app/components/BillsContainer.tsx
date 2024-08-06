"use client";
import React, { useEffect, useState } from "react";

type billsItemType = {
  employee_id: number;
  employee_name: string;
  category: string;
  cost: number;
  billno: number;
};

let SampleBillList: billsItemType[] = [];

const BillsContainer = () => {
  const [bills, setBills] = React.useState(SampleBillList);

  useEffect(() => {
    fetch("http://localhost:8080/api/Admin")
      .then((response) => response.json())
      .then((data: billsItemType[]) => {
        console.log(data);
        setBills(data);
      });
  });

  return (
    <ul className="BillsContainer">
      {bills.map((billsItem: billsItemType) => (
        <li className="BillSingle">{billsItem.employee_name}</li>
      ))}
    </ul>
  );
};

export default BillsContainer;
