import React from "react";
import { useState } from "react";
import axios from "axios";
import Calendar from "react-date-picker";

type BillsItemType = {
  employee_id: number;
  employee_name: string;
  category: string;
  cost: number;
  bill_no: number;
  bill_recipient: string;
  bill_date: Date;
  submitted_date: Date;
  bill_status: string;
};

const BillEntry = (props: {
  userID: string;
  setBills: (newBill: BillsItemType) => void;
}) => {
  const [newBill, setNewBill] = useState<BillsItemType>({
    employee_id: +props.userID,
    employee_name: "",
    category: "",
    cost: 0,
    bill_no: 0,
    bill_recipient: "",
    bill_date: new Date(),
    submitted_date: new Date(),
    bill_status: "",
  });

  const [error, setError] = useState<string>("");

  const handleNewBillChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setNewBill((prevBill) => ({ ...prevBill, [name]: value }));
  };

  const handleBillDateChange = (date: Date) => {
    setNewBill((prevBill) => ({ ...prevBill, bill_date: date }));
  };

  return (
    <li className="BillEntry">
      <form>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={newBill.category}
          onChange={handleNewBillChange}
        />
        <br />
        <label>Cost:</label>
        <input
          type="number"
          name="cost"
          value={newBill.cost}
          onChange={handleNewBillChange}
        />
        <br />
        <label>Bill Recipient:</label>
        <input
          type="text"
          name="bill_recipient"
          value={newBill.bill_recipient}
          onChange={handleNewBillChange}
        />
        <br />
        <label>Bill Date:</label>
        <Calendar
          value={newBill.bill_date}
          format="yyyy-MM-dd"
          minDate={new Date("2022-01-01")}
          maxDate={new Date("2025-12-31")}
        />
        <br />
        <button
          type="button"
          onClick={() => {
            props.setBills(newBill);
          }}
        >
          Submit New Bill
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
      </form>
    </li>
  );
};

export default BillEntry;
