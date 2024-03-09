import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, FilledInput, Link, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import axiosInstance from "src/api/axios";

const Page = () => {
  return (
    <>
      <Head>
        <title>Create Service | Admin Jospat</title>
      </Head>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Create new Service</Typography>
            </Stack>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const fd = new FormData(e.target);
                // Array.from(e.target).map((el) => {
                //   console.log(el.name, el.value);
                //   if (el.type == "file") {
                //     fd.append(el.name, el.files[0]);
                //     console.log(el.files)
                //   }
                //   fd.append(el.name, el.value);
                // });

                try {
                  const response = await axiosInstance.post("/services/add", fd, {
                    headers: {
                      Authorization: `Bearer ${
                        typeof window != "undefined" && window.sessionStorage.getItem("sid")
                      }`,
                    },
                  });

                  alert(response.data.msg)
                  window.location.replace("/")
                } catch (error) {
                  alert(error.response.data.msg)
                }
              }}
            >
              <Stack spacing={3}>
                <TextField label="Service Name" name="name" />
                <TextField label="Price Max" name="sale_price" type="number" />
                <TextField label="Price Min" name="regular_price" type="number" />
                <TextField label="Description" name="description" />
                <TextField label="Category" name="category" />
                <FilledInput type="file" name="images" mulitple />
              </Stack>
              <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                Create
              </Button>
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};
export default Page;
