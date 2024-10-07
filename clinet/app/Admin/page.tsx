"use client";

import BillsContainer from "../components/BillsContainer";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import React, { useEffect } from "react";
import UsersContainer from "../components/UsersContainer";

type billsItemType = {
  employee_id: number;
  employee_name: string;
  category: string;
  cost: number;
  bill_no: number;
};

let SampleBillList: billsItemType[] = [];

export default function Home() {
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
    <div className="main">
      <div className="Header">Admin</div>
      <div className="Body">
        <div className="TimeSelector">
          <ul className="TimeSelectorOptions">
            {/*
              <li className="TimeSelectorOptionSingle">past 7 days</li>
              <li className="TimeSelectorOptionSingle">past 28 days</li>
              <li className="TimeSelectorOptionSingle">this week</li>
              <li className="TimeSelectorOptionSingle">this month</li>
              */}
          </ul>
        </div>
        <Dashboard />

        <div className="Bills">
          <div className="BillsSelector">Employees</div>
          <UsersContainer />
          <div className="BillsSelector">Bills Submitted</div>
          <BillsContainer />
        </div>
      </div>
      <Footer />
    </div>
  );
}
