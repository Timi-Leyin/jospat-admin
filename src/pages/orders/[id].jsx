import React, { useContext, useEffect, useState } from "react";
import { Layout as DashboardLayout, adminContext } from "src/layouts/dashboard/layout";
import {
  Badge,
  Box,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import axiosInstance from "src/api/axios";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";

const SingleOrderPage = () => {
  const params = useParams();
  // console.log(params)
  const id = params.id || 0;
  const [data, setData] = useState();
  const [status, setStatus] = useState();
  const [price, setPrice] = useState();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleUpdateOrder = async () => {
    // TODO: Implement the logic to update the order with the new status and price
    console.log(`Updating Order ${id} - Status: ${status}, Price: ${price}`);
    try {
      const response = await axiosInstance.put(
        `/orders/${id}`,
        {
          status,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${
              typeof window != "undefined" && window.sessionStorage.getItem("sid")
            }`,
          },
        }
      );

      alert("Order Updated");
    } catch (error) {
      alert("Could not update Order");
    }
  };

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${
            typeof window != "undefined" && window.sessionStorage.getItem("sid")
          }`,
        },
      });
      setData(response.data.data);
      setStatus(response.data.data.status);
      setPrice(response.data.data.amount);
    } catch (error) {}
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      {data && (
        <Container maxWidth="xl">
          <Box
            sx={{ border: "1px solid #ccc", padding: "16px" }}
            onClick={() => handleOrderClick(order)}
          >
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>Order #{id}</Typography>
            <Typography sx={{ fontSize: "16px", color: "#666" }}>Status: {data.status}</Typography>
          </Box>
          <Grid xs={12}
sm={6}
lg={3}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              Service Name: {data.service.name}
            </Typography>
          </Grid>

          <Grid xs={12}
my={5}
sm={6}
lg={3}>
            <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>Update Status</Typography>
            <TextField
              select
              label="Status"
              defaultValue={data.status}
              onChange={handleStatusChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            >
              <MenuItem value="initial">Initial</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="waiting to be reviewed">Waiting to be Reviewed</MenuItem>
              <MenuItem value="working">Working</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </TextField>
            <TextField
              type="number"
              label="Price"
              value={price}
              onChange={handlePriceChange}
              fullWidth
              sx={{ marginBottom: 2 }}
            />
            <Button variant="contained"
color="primary"
onClick={handleUpdateOrder}>
              Update Order
            </Button>
          </Grid>
        </Container>
      )}
    </DashboardLayout>
  );
};

export default SingleOrderPage;
