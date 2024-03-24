import React, { useState } from "react";
import { SeverityPill } from "src/components/severity-pill";
import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  CardHeader,
  MenuItem,
  TextField,
  Table,
  TableBody,
  TableRow,
  TableCell,
  DialogContentText,
  DialogTitle,
  Divider,
  Skeleton,
  Slide,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import Progress from "./progress";
import { getInitials } from "src/utils/get-initials";
import { statusMap } from "src/sections/customer/order-table";
import moneySplitter from "src/utils/money-splitter";
import axiosInstance from "src/config/axios";

const OrderDetails = ({ order }) => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (event) => {
    if (order) {
      event.preventDefault();
      // console.log(event.target);
      const fd = new FormData(event.target);
      setLoading(true);
      setError("");
      try {
        const response = await axiosInstance.put(`/orders/${order.uuid}`, fd);
        window.location.reload();
        alert(response.data.msg);
        // router.back();
      } catch (err) {
        console.log(err);
        if (typeof err.response != "undefined") {
          setError(err.response.data.msg);
          return;
        }
        setError("Check Your Internet Connection");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div>
      <Box onClick={() => setError("")} position={"fixed"} right={0} zIndex={99}>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>
      <Box display={"flex"} mt={5} flexDirection={"row"} gap={"24px"}>
        <Grid spacing={5} flex={1} justifyContent={"space-between"}>
          <Grid item lg={6} md={6} xl={4} xs={12}>
            <Card>
              <CardContent>
                <Box
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Avatar
                    sx={{
                      mb: 2,
                      width: 120,
                      height: 120,
                      cursor: "pointer",
                    }}
                  >
                    {order && getInitials(`${order.User.first_name} ${order.User.last_name}`)}
                  </Avatar>
                  <Typography gutterBottom variant="h5" width={"unset"}>
                    {order ? `${order.User.first_name} ${order.User.last_name}` : "-"}
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    // width={"unset"}
                  >
                    {order ? "@" + order.User.username : "-"}
                  </Typography>
                  <Typography color="text.secondary" variant="body2" width={"unset"}>
                    {order ? order.User.email : "-"}
                  </Typography>
                </Box>
              </CardContent>
              {/* <Divider />
              <CardActions>
                <Button fullWidth variant="text">
                  Upload picture
                </Button>
              </CardActions> */}
              {/* <Dialog keepMounted onClose={close} open={openModal} TransitionComponent={Transition}>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please cross-check before you take this action.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button color="primary" variant="contained" onClick={undefined}>
                    Approve
                  </Button>
                  <Button color="error" variant="contained" onClick={undefined}>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog> */}
              <Progress loading={false} />
            </Card>
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            {/* <CustomerInfo isApplication={isApplication} /> */}
          </Grid>
        </Grid>

        <Grid spacing={5} flex={1}>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <Card>
              <CardHeader title="Orders information" />
              <Divider />
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>
                        {order ? new Date(order.createdAt).toDateString() : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>
                        <SeverityPill color={statusMap[order ? order.status : "pending"]}>
                          {/* {order.status} */}
                          {order ? order.status : "pending"}
                        </SeverityPill>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Amount</TableCell>
                      <TableCell>
                        {order
                          ? order.amount
                            ? "NGN " + moneySplitter(order.amount)
                            : "N/A"
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Inspection Date</TableCell>
                      <TableCell>
                        {order
                          ? order.inspection_date
                            ? new Date(order.inspection_date).toLocaleDateString()
                            : "N/A"
                          : "-"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Address</TableCell>
                      <TableCell>{order ? order.address.address : "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>State</TableCell>
                      <TableCell>{order ? order.address.state : "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>City</TableCell>
                      <TableCell>{order ? order.address.city : "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Phone No</TableCell>
                      <TableCell>{order ? order.address.phone_number : "-"}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Additional Info</TableCell>
                      <TableCell>
                        {order
                          ? order.address.additional_info
                            ? order.address.additional_info
                            : "N/A"
                          : "None"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              {order && (
                <CardActions>
                  <Box mx={3} mb={3} method="POST" component={"form"} onSubmit={handleSubmit}>
                    <Typography mb={3} fontWeight={"bold"} fontSize={"17px"}>
                      Update Order
                    </Typography>
                    <Box
                      display={"flex"}
                      justifyContent={"center"}
                      gap={3}
                      flexWrap={"wrap"}
                      mb={2}
                    >
                      <TextField
                        fullWidth
                        label="Actual Price (NGN)"
                        name="price"
                        required
                        type="number"
                        defaultValue={order.amount}
                      />
                      <TextField
                        fullWidth
                        label="Inspection Date"
                        name="inspection_date"
                        required
                        defaultValue={order.inspection_date && order.inspection_date.split("T")[0]}
                        type="date"
                      />
                      <TextField
                        select
                        required
                        label="Status"
                        name="status"
                        defaultValue={order.status.toLowerCase()}
                        // onChange={handleStatusChange}
                        fullWidth
                        sx={{ marginBottom: 2 }}
                      >
                        <MenuItem value="initial">Initial</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="waiting to be reviewed">Waiting to be Reviewed</MenuItem>
                        <MenuItem value="will be inspecting soon">Will be Inspecting soon</MenuItem>
                        <MenuItem value="working">Working</MenuItem>
                        <MenuItem value="waiting for payment">Waiting for payment</MenuItem>
                        <MenuItem value="paid">Paid</MenuItem>
                        <MenuItem value="completed">Completed</MenuItem>
                      </TextField>
                    </Box>

                    <Button type="submit" disabled={isLoading} variant="contained">
                      {isLoading ? <CircularProgress size={25} /> : "Update Order"}
                    </Button>
                  </Box>
                </CardActions>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default OrderDetails;
