import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "src/components/scrollbar";
import { getInitials } from "src/utils/get-initials";
import { SeverityPill } from "src/components/severity-pill";
import Link from "next/link";
import moneySplitter from "src/utils/money-splitter";

export const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const OrderTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => { },
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  console.log(items);
  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Service Name</TableCell>
                <TableCell>User</TableCell>
                <TableCell>Final Price</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.uuid);
                // const createdAt = format(customer.createdAt, 'dd/MM/yyyy');

                return (
                  <TableRow hover key={customer.uuid} selected={isSelected}>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        {/* <Avatar src={customer.avatar}> */}
                        {/* {getInitials(customer.name)} */}
                        {/* </Avatar> */}
                        <Typography variant="subtitle2">
                          <b style={{ fontSize: "20px" }}># </b>
                          {customer.id}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <Link href={`/orders/${customer.uuid}`}>{customer.service.name}</Link>
                    </TableCell>
                    <TableCell>
                      {customer.User.first_name + " " + customer.User.last_name}
                    </TableCell>
                    <TableCell>
                      {customer.amount
                        ? "NGN " + moneySplitter(customer.amount)
                        : "Not Yet Finalized"}
                    </TableCell>
                    <TableCell>
                      {
                        customer && customer.address ? (
                          <div>
                            {customer.address.address}, {customer.address.city}, {customer.address.state}

                          </div>
                        ) : <div>
                          N/A
                        </div>
                      }
                    </TableCell>
                    <TableCell>{new Date(customer.createdAt).toDateString()}</TableCell>
                    <TableCell>
                      <SeverityPill color={statusMap[customer.status]}>
                        {/* {order.status} */}
                        {customer.status}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OrderTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
};
