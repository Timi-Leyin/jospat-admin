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
import moneySplitter from "src/utils/money-splitter";
import Link from "next/link";

const statusMap = {
  pending: "warning",
  delivered: "success",
  refunded: "error",
};

export const ServicesTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Created At</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Price MIN</TableCell>
                <TableCell>Price MAX</TableCell>
                <TableCell>Thubmbnail</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                // console.log(customer && customer.thumbnail[0].src);
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
                          {new Date(customer.createdAt).toDateString()}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell><Link href={`/services/${customer.uuid}`}>{customer.name}</Link></TableCell>
                    <TableCell>{customer.Creator.email}</TableCell>
                    <TableCell>{"NGN " + moneySplitter(customer.sale_price)}</TableCell>
                    <TableCell>{"NGN " + moneySplitter(customer.regular_price)}</TableCell>
                    <TableCell>
                      <Avatar src={customer.thumbnail[0].src}>{getInitials(customer.name)}</Avatar>
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

ServicesTable.propTypes = {
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
