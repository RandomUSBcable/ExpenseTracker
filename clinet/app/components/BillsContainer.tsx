"use client";
import React, { useEffect, useState } from "react";

type billsItemType = {
  employee_id: number;
  employee_name: string;
  category: string;
  cost: number;
  bill_no: number;
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
        <li className="BillSingle">
          <div className="BillHeader">
            <div className="BillNo">{billsItem.bill_no}</div>
            <div className="BillRecipient">abcdefghijakm</div>
          </div>
          <div className="BillBody">
            <div className="BillUser">{billsItem.employee_name}</div>
            <div className="BillCost">₹{billsItem.cost}</div>
            <div className="BillCategory">{billsItem.category}</div>
          </div>
          <div className="BillFooter">
            <div className="BillStatus">Reinbursed</div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BillsContainer;
