import React from "react";
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
  SeverityPill,
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
} from "@mui/material";
import Progress from "./progress";

const OrderDetails = () => {
  return (
    <div>
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
                    OT
                  </Avatar>
                  <Typography gutterBottom variant="h5" width={"unset"}>
                    OriginalTImi
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    // width={"unset"}
                  >
                    OT
                  </Typography>
                  <Typography color="text.secondary" variant="body2" width={"unset"}>
                    admin
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
                      <TableCell>Type</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>{Date.now()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Status</TableCell>
                      <TableCell>
                        as
                        {/* <SeverityPill
                    padding={"0"}
                    color={statusMap[application?.status?.toLowerCase()]}
                  >
                    <Chip label={"Pending"} />
                    pending
                  </SeverityPill> */}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Document</TableCell>
                      <TableCell>me.pdf</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardActions>
                <Box mx={3} mb={3}>
                  <Typography mb={3} fontWeight={"bold"} fontSize={"17px"}>Update Order</Typography>
                  <Box display={"flex"} justifyContent={"center"} gap={3} flexWrap={"wrap"} mb={2}>
                    <TextField
                      fullWidth
                      label="Actual Price (NGN)"
                      name="amount"
                      type="number"
                      value={"1000"}
                    />
                    <TextField
                      fullWidth
                      label="Inspection Date"
                      name="inspection_date"
                      type="date"
                    />
                    <TextField
                      select
                      label="Status"
                      defaultValue={"initial"}
                      // onChange={handleStatusChange}
                      fullWidth
                      sx={{ marginBottom: 2 }}
                    >
                      <MenuItem value="initial">Initial</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="waiting to be reviewed">Waiting to be Reviewed</MenuItem>
                      <MenuItem value="working">Working</MenuItem>
                      <MenuItem value="completed">Completed</MenuItem>
                    </TextField>
                  </Box>

                  <Button variant="contained">Update Order</Button>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default OrderDetails;
