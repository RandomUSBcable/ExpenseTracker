"use client";

import React from "react";

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

type Props = {
  billsInfo: billsItemType;
};

const Bill = (props: Props) => {
  return (
    <li className="BillSingle">
      <div className="BillHeader">
        <div className="BillNo">{props.billsInfo.bill_no}</div>
        <div className="BillRecipient">{props.billsInfo.bill_recipient}</div>
      </div>
      <div className="BillBody">
        <div className="BillUser">{props.billsInfo.employee_name}</div>
        <div className="BillCost">₹{props.billsInfo.cost}</div>
        <div className="BillCategory">{props.billsInfo.category}</div>
      </div>
      <div className="BillFooter">
        <div className="BillStatus">{props.billsInfo.bill_status}</div>
      </div>
    </li>
  );
};

export default Bill;
