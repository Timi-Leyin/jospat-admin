import { useCallback, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import PencilIcon from "@heroicons/react/24/solid/PencilIcon";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import FolderIcon from "@heroicons/react/24/solid/FolderIcon";
import CloseIcon from "@heroicons/react/24/solid/XMarkIcon";
import { Box, Button, Container, Stack, SvgIcon, TextField, Typography } from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/order-table";
import { CustomersSearch } from "src/sections/customer/order-search";
import { applyPagination } from "src/utils/apply-pagination";
import Image from "next/image";

// const now = new Date();

// const useCustomers = (page, rowsPerPage) => {
//   return useMemo(() => {
//     return applyPagination(data, page, rowsPerPage);
//   }, [page, rowsPerPage]);
// };

// const useCustomerIds = (customers) => {
//   return useMemo(() => {
//     return customers.map((customer) => customer.id);
//   }, [customers]);
// };

const Page = () => {
  //   const [page, setPage] = useState(0);
  //   const [rowsPerPage, setRowsPerPage] = useState(5);
  //   const customers = useCustomers(page, rowsPerPage);
  //   const customersIds = useCustomerIds(customers);
  //   const customersSelection = useSelection(customersIds);

  //   const handlePageChange = useCallback((event, value) => {
  //     setPage(value);
  //   }, []);

  //   const handleRowsPerPageChange = useCallback((event) => {
  //     setRowsPerPage(event.target.value);
  //   }, []);

  return (
    <>
      <Head>
        <title>Services | Jospat Admin</title>
      </Head>

      <Box pb={10}>
        <Stack direction="row" justifyContent="space-between" spacing={4} px={12} my={5}>
          <Stack spacing={1}>
            <Typography variant="h4">Serevice</Typography>
          </Stack>
          <Stack direction={"row"} gap={2}>
            <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <PencilIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              Edit
            </Button>
            <Button
              color="error"
              startIcon={
                <SvgIcon fontSize="small">
                  <TrashIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              Delete
            </Button>
          </Stack>
        </Stack>

        <Stack flexWrap={"wrap"} justifyContent={"center"} px={5} direction={"row"} gap={5} pt={2}>
          <Box
            component="img"
            width={500}
            borderRadius={5}
            height={500}
            src={"/admin/assets/products/product-1.png"}
          ></Box>
          <Box>
            <TextField
              fullWidth
              label="Service Name"
              name="email"
              type="text"
              value={"Body Lotion Oil"}
            />
            <textarea
              style={{
                width: "100%",
                padding: "20px",
                border: "1px solid #ddd",
                outline: "none",
                height: 140,
                borderRadius: 10,
                margin: "10px 0px",
              }}
              value={
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint dignissimos mollitia molestiae repellendus dolor, voluptates quis tempora. Consequatur minus error cum eos    nulla, quae obcaecati, soluta blanditiis, repellendus culpa fugiat!"
              }
            />

            <Typography fontSize={15}></Typography>
            <TextField fullWidth label="Service Category" name="email" type="text" value={"Oils"} />
            <Box my={1}>
              <TextField fullWidth name="email" type="file" />
            </Box>
            <Stack direction={"row"} gap={5} py={1}>
              <TextField
                fullWidth
                label="Service MIN PRICE"
                name="email"
                type="text"
                value={"$4000"}
              />
              <TextField
                fullWidth
                label="Service MAX PRICE"
                name="email"
                type="text"
                value={"$10000"}
              />
            </Stack>
            <Stack direction={"row"} gap={4} pt={4}>
              <Button
                color="info"
                startIcon={
                  <SvgIcon fontSize="small">
                    <CloseIcon />
                  </SvgIcon>
                }
                variant="contained"
              >
                Clear
              </Button>
              <Button
                color="success"
                startIcon={
                  <SvgIcon fontSize="small">
                    <FolderIcon />
                  </SvgIcon>
                }
                variant="contained"
              >
                Save
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
