import { Box, Container, Tabs, colors, Tab, Divider, Stack, Typography } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import OrderDetails from "src/components/order-details";
import { adminContext } from "src/contexts/admin-context";
import { useParams } from "next/navigation";

const tabs = [
  { value: "details", label: "Details" },
  { value: "History", label: "Order History" },
];

const Page = () => {
  const [tab, setTab] = useState(tabs[0].value);

  const handleTabsChange = (event, value) => {
    setTab(value);
  };

  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const ctx = useContext(adminContext);
  const [id, setId] = useState("");
  const params = useParams();
  const router = useRouter();
  const { uuid } = params;

  const order = ctx.data.orders ? ctx.data.orders.filter((ord) => ord.uuid === uuid) : [];

  // useEffect(() => {
  //   if (uuid) {

  //   }

  // }, []);

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
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Stack spacing={1} p={2}>
        <Typography variant="h4">Order</Typography>
      </Stack>
      <Container
        maxWidth="xl"
        sx={{
          width: "full",
        }}
      >
        <Tabs onChange={handleTabsChange} scrollButtons="auto" value={tab} variant="scrollable">
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
        <Divider />
        <div>
          {tab === tabs[0].value && <OrderDetails order={order[0]} />}
          {tab === tabs[1].value && (
            <Typography my={2} fontWeight={"bold"}>
              Coming soon
            </Typography>
          )}
        </div>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
