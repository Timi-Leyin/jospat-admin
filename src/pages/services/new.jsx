import Head from "next/head";
import FolderIcon from "@heroicons/react/24/solid/FolderIcon";
import CloseIcon from "@heroicons/react/24/solid/XMarkIcon";
import {
  Box,
  Button,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { useState } from "react";
import axiosInstance from "src/config/axios";
import { useRouter } from "next/router";

const Page = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState();

  const imageInputHandler = async (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(event.target);
    const fd = new FormData(event.target);
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post("/services/add", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      event.target.reset();
      alert(response.data.msg);
      router.back();
    } catch (err) {
      console.log(err);
      if (typeof err.response != "undefined") {
        return setError(err.response.data.msg);
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

      <Box pb={10}>
        <Stack direction="row" justifyContent="space-between" spacing={4} px={12} my={5}>
          <Stack spacing={1}>
            <Typography variant="h4">Create New Service</Typography>
          </Stack>
        </Stack>
        <Box onClick={() => setError("")} position={"fixed"} right={0} zIndex={99}>
          {error && <Alert severity="error">{error}</Alert>}
        </Box>

        <Stack flexWrap={"wrap"} justifyContent={"center"} px={5} direction={"row"} gap={5} pt={2}>
          <Box
            component="img"
            width={500}
            borderRadius={5}
            height={500}
            style={{
              objectFit: "cover",
            }}
            src={previewImage || "/admin/assets/products/product-1.png"}
          ></Box>
          <Box component={"form"} method="post" onSubmit={submitHandler}>
            <TextField fullWidth required label="Service Name" name="name" type="text" />
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
              required
              //   helperText={formik.touched.email && formik.errors.email}
              placeholder="Service Description"
            />

            <Typography fontSize={15}></Typography>
            <TextField fullWidth label="Service Category" name="category" required type="text" />
            <Box my={1}>
              <TextField
                label="Image"
                fullWidth
                onChange={imageInputHandler}
                name="images"
                type="file"
              />
            </Box>
            <Stack direction={"row"} gap={5} py={1}>
              <TextField fullWidth label="MIN PRICE" name="regular_price" type="number" required />
              <TextField fullWidth label="MAX PRICE" name="sale_price" type="number" required />
            </Stack>
            <Stack direction={"row"} gap={4} pt={4}>
              <Button
                type="reset"
                disabled={isLoading}
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
                disabled={isLoading}
                type="submit"
                color="success"
                startIcon={
                  <SvgIcon fontSize="small">
                    <FolderIcon />
                  </SvgIcon>
                }
                variant="contained"
              >
                {isLoading ? <CircularProgress size={25} /> : "Create"}
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
