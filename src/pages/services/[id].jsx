import Head from "next/head";
import NextLink from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, FilledInput, Link, Stack, TextField, Typography } from "@mui/material";
import { useAuth } from "src/hooks/use-auth";
import { Layout as AuthLayout } from "src/layouts/auth/layout";
import axiosInstance from "src/api/axios";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
        setLoading(true)
      const response = await axiosInstance.get(`/services/${id}`, {
        headers: {
          Authorization: `Bearer ${
            typeof window != "undefined" && window.sessionStorage.getItem("sid")
          }`,
        },
      });
      setData(response.data.data);
    } catch (error) {
      alert("Could not Fetch Services");
    }finally{
        setLoading(false)
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Edit | Admin Jospat</title>
      </Head>
        {
            isLoading  ? (<Typography variant="h4">Loading</Typography>): data && (
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
                      <Typography variant="h4">Edit Service</Typography>
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
                          const response = await axiosInstance.put(`/services/${id}`, fd, {
                            headers: {
                              Authorization: `Bearer ${
                                typeof window != "undefined" && window.sessionStorage.getItem("sid")
                              }`,
                            },
                          });
        
                          alert(response.data.msg);
                        } catch (error) {
                          alert(error.response.data.msg);
                        }
                      }}
                    >
                      <Stack spacing={3}>
                        <TextField label="Service Name" defaultValue={data.name} name="name" />
                        <TextField label="Price Max" defaultValue={data.sale_price} name="sale_price" type="number" />
                        <TextField label="Price Min" defaultValue={data.regular_price} name="regular_price" type="number" />
                        <TextField label="Description" defaultValue={data.description} name="description" />
                        <TextField label="Category" defaultValue={data.category} name="category" />
                        <FilledInput type="file" name="images" mulitple />
                      </Stack>
                      <Button fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                        Update
                      </Button>
                    </form>
                  </div>
                </Box>
              </Box>
            )
        }
    </>
  );
};
export default Page;
