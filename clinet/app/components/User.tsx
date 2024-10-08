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

type UsersItemType = {
  employee_name: string;
  employee_id: number;
  total: number;
};

type Props = {
  userInfo: UsersItemType;
};

const User = (props: Props) => {
  return (
    <li className="UserSingle">
      <div className="UserHeader">
        <div className="UserNo">ID: </div>
        <div className="BillRecipient">Conpany Name</div>
      </div>
      <div className="UserBody">
        <div className="UserName">{props.userInfo.employee_name}</div>
        <div className="UserName">====</div>
        <div className="BillCategory">title</div>
        <div className="BillCost">₹{props.userInfo.total}</div>
      </div>
      <div className="UserFooter">
        <div className="BillStatus">
          Add alloc here, and reinbursment status
        </div>
      </div>
    </li>
  );
};

export default User;
