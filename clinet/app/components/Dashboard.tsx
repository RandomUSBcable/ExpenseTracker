"use client";

import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Container } from "@mui/material";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

interface Category {
  name: string;
  value: number;
}

interface DashboardData {
  totalSpent: number;
  totalAllocated: number;
  categories: Category[];
}

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#82CA9D",
];

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/Admin");
        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }
        const data = await response.json();

        // Process the data
        const totalSpent = data.users.reduce(
          (sum: number, user: any) => sum + user.total,
          0
        );
        const totalAllocated = data.users.reduce(
          (sum: number, user: any) => sum + user.allocation,
          0
        );
        const categories = Object.entries(data.categories).map(
          ([name, value]: [any, any]) => ({
            name,
            value,
          })
        );

        setDashboardData({
          totalSpent: Number(totalSpent.toFixed(2)),
          totalAllocated: Number(totalAllocated.toFixed(2)),
          categories: categories.map((cat) => ({
            ...cat,
            value: Number(cat.value.toFixed(2)),
          })),
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <Typography>Loading...</Typography>;
  }

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="Dashboard">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: "20px", height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Total Spent
              </Typography>
              <Typography variant="h4">
                {formatCurrency(dashboardData.totalSpent)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: "20px", height: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Total Allocated
              </Typography>
              <Typography variant="h4">
                {formatCurrency(dashboardData.totalAllocated)}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: "20px", height: "400px" }}>
              <Typography variant="h6" gutterBottom>
                Spending by Category
              </Typography>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={dashboardData.categories}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, value }) =>
                      `${name}: ${formatCurrency(value)}`
                    }
                  >
                    {dashboardData.categories.map((entry, index) => (
                      <Cell
                        cy="50%"
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;
