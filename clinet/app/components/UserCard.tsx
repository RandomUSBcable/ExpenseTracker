"use client";
import React, { useState } from "react";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";

interface Bill {
  bill_no: number;
  employee_id: number;
  category: string;
  cost: number;
  bill_recipient: string;
  bill_date: string;
  submitted_date: string;
  bill_status: string;
}

interface User {
  employee_id: number;
  employee_name: string;
  title: string;
  allocation: number;
  total: number;
  bills: Bill[];
}

interface UserCardProps {
  user: User;
  onAllocationUpdate: (userId: number, newAllocation: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onAllocationUpdate }) => {
  const [newAllocation, setNewAllocation] = useState(user.allocation);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setNewAllocation(user.allocation);
  }, [user.allocation]);

  const handleAllocationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewAllocation(Number(event.target.value));
  };

  const handleAllocationSubmit = () => {
    onAllocationUpdate(user.employee_id, newAllocation);
    setIsEditing(false);
  };

  const totalAmount = user.bills.reduce(
    (sum, bill) => sum + (bill.cost || 0),
    0
  );

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {user.employee_name}
        </Typography>
        <Typography color="text.secondary" gutterBottom>
          {user.title}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Employee ID: {user.employee_id}
        </Typography>
        <Typography variant="body2" gutterBottom>
          Total Amount Spent: ${user.total}
        </Typography>

        <Box sx={{ mt: 2 }}>
          {isEditing ? (
            <Box>
              <TextField
                type="number"
                value={newAllocation}
                onChange={handleAllocationChange}
                fullWidth
                size="small"
                margin="normal"
              />
              <Button
                onClick={handleAllocationSubmit}
                variant="contained"
                color="primary"
                fullWidth
              >
                Save
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="body2" gutterBottom>
                Current Allocation: ${user.allocation.toFixed(2)}
              </Typography>
              <Button
                onClick={() => setIsEditing(true)}
                variant="outlined"
                color="primary"
                fullWidth
              >
                Edit Allocation
              </Button>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserCard;
