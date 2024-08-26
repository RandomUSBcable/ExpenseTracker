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
