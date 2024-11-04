"use client";

import React from "react";
import { Pie, PieChart, Cell } from "recharts";

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
  allocation: number;
};

type Props = {
  userInfo: UsersItemType;
};

const User = (props: Props) => {
  const [allocation, setAllocation] = React.useState(props.userInfo.allocation);
  const [spentPercentage, setSpentPercentage] = React.useState(0);

  React.useEffect(() => {
    if (allocation > 0) {
      setSpentPercentage((props.userInfo.total / allocation) * 100);
    }
  }, [allocation, props.userInfo.total]);

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
        setAllocation(amount);
        console.log("Allocation updated:", data);
      })
      .catch((error) => {
        console.error("Error allocating amount:", error);
      });
  };

  const data = [
    { name: "Spent", value: props.userInfo.total },
    {
      name: "Remaining",
      value: Math.max(0, allocation - props.userInfo.total),
    },
  ];
  const COLORS = ["#FF0000", "#00C49F"];

  return (
    <li className="BillsSingle">
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
          <p>Allocation: ₹{allocation}</p>
          <input
            type="number"
            placeholder="Allocate amount"
            onChange={(e) =>
              handleAllocation(
                props.userInfo.employee_id,
                Number(e.target.value)
              )
            }
          />
          <p>Spent: {spentPercentage.toFixed(2)}%</p>
          <PieChart width={100} height={100}>
            <Pie
              data={data}
              cx={50}
              cy={50}
              innerRadius={30}
              outerRadius={40}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
      </div>
    </li>
  );
};

export default User;
