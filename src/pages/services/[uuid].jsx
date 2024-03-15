import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ArrowUpOnSquareIcon from "@heroicons/react/24/solid/ArrowUpOnSquareIcon";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import PencilIcon from "@heroicons/react/24/solid/PencilIcon";
import TrashIcon from "@heroicons/react/24/solid/TrashIcon";
import FolderIcon from "@heroicons/react/24/solid/FolderIcon";
import CloseIcon from "@heroicons/react/24/solid/XMarkIcon";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { useSelection } from "src/hooks/use-selection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { CustomersTable } from "src/sections/customer/order-table";
import { CustomersSearch } from "src/sections/customer/order-search";
import { applyPagination } from "src/utils/apply-pagination";
import Image from "next/image";
import { useRouter } from "next/router";
import { useParams } from "next/navigation";
import { adminContext } from "src/contexts/admin-context";
import axiosInstance from "src/config/axios";

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
  const [isLoading, setLoading] = useState(false);
  const [loading, setLoad] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const ctx = useContext(adminContext);
  const [id, setId] = useState("");
  const params = useParams();
  const router = useRouter();

  const [previewImage, setPreviewImage] = useState();

  const imageInputHandler = async (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
  };

  const fetchData = async () => {
    setLoad(true);
    try {
      const response = await axiosInstance.get(`/services/${params.uuid}`);
      setData(response.data.data);
    } catch (error) {
      // console.log(error)
    } finally {
      setLoad(false);
    }
  };

  useEffect(() => {
    const { uuid } = params;
    if (uuid) {
      setId(uuid);
      ctx.data.services &&
        ctx.data.services.map((s) => {
          if (s.uuid === id) {
            setData(s);
          }
        });
    }

    fetchData();
  }, []);

  const onDelete = async () => {
    setLoading(true);

    const _confirm = confirm("Are you sure, you want to Delete?");

    if (!_confirm) {
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.delete(`/services/${params.uuid}`);
      alert(response.data.msg);
      router.back();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    // console.log(event.target);
    const fd = new FormData(event.target);
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.put(`/services/${id}`, fd);
      event.target.reset();
      alert(response.data.msg);
      router.back();
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
  };

  return (
    <>
      <Head>
        <title>Services | Jospat Admin</title>
      </Head>
      <Box onClick={() => setError("")} position={"fixed"} right={0} zIndex={99}>
        {error && <Alert severity="error">{error}</Alert>}
      </Box>

      <Box pb={10}>
        <Stack direction="row" justifyContent="space-between" spacing={4} px={12} my={5}>
          <Stack spacing={1}>
            <Typography variant="h4">{data && data.name}</Typography>
          </Stack>
          <Stack direction={"row"} gap={2}>
            {/* <Button
              startIcon={
                <SvgIcon fontSize="small">
                  <PencilIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              Edit
            </Button> */}
            <Button
              onClick={onDelete}
              color="error"
              startIcon={
                <SvgIcon fontSize="small">
                  <TrashIcon />
                </SvgIcon>
              }
              variant="contained"
            >
              {isLoading ? <CircularProgress size={25} /> : "Delete"}
            </Button>
          </Stack>
        </Stack>

        {loading ? (
          <CircularProgress size={25} />
        ) : !error && data ? (
          <Stack
            flexWrap={"wrap"}
            justifyContent={"center"}
            px={5}
            direction={"row"}
            gap={5}
            pt={2}
          >
            <Box
              component="img"
              width={500}
              borderRadius={5}
              height={500}
              style={{
                objectFit: "cover",
              }}
              src={previewImage || data.thumbnail[0].src}
            ></Box>
            <Box onSubmit={submitHandler} component={"form"}>
              <TextField
                fullWidth
                label="Service Name"
                name="name"
                type="text"
                defaultValue={data.name}
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
                name="description"
                defaultValue={data.description}
              />

              <Typography fontSize={15}></Typography>
              <TextField
                fullWidth
                label="Service Category"
                defaultValue={data.category}
                name="category"
                type="text"
              />
              <Box my={1}>
                <TextField fullWidth name="images" onChange={imageInputHandler} type="file" />
              </Box>
              <Stack direction={"row"} gap={5} py={1}>
                <TextField
                  fullWidth
                  label="Service MIN PRICE"
                  name="regular_price"
                  type="number"
                  defaultValue={data.regular_price}
                />
                <TextField
                  fullWidth
                  label="Service MAX PRICE"
                  name="sale_price"
                  type="number"
                  defaultValue={data.sale_price}
                />
              </Stack>
              <Stack direction={"row"} gap={4} pt={4}>
                <Button
                  type="reset"
                  color="info"
                  onClick={() => {
                    setPreviewImage("");
                  }}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <CloseIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  Reset
                </Button>
                <Button
                  color="success"
                  type="submit"
                  disabled={isLoading}
                  startIcon={
                    <SvgIcon fontSize="small">
                      <FolderIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                >
                  {isLoading ? <CircularProgress size={25} /> : "Update"}
                </Button>
              </Stack>
            </Box>
          </Stack>
        ) : (
          <Typography>An Error Occured, Please Refresh</Typography>
        )}
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
