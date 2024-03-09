import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Button, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout, adminContext } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";

const now = new Date();

const Page = () => {
  const ctx = useContext(adminContext);
  console.log(ctx);
  return (
    <>
      <Head>
        <title>Overview | JosPat Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        {ctx.loading ? (
          <>loading....</>
        ) : typeof ctx.data.user != "undefined" ?(
          (
            <Container maxWidth="xl">
             <Link href={"/new-service"}>
             <Button>
                  Add New Service
                </Button></Link>
              <Grid justifyContent={"center"} container spacing={3}>
                <Grid xs={12} sm={6} lg={3}>
                  <OverviewBudget positive={1} sx={{ height: "100%" }} value={ctx.data.transactions._sum.amount} />
                </Grid>
                
                <Grid xs={12} sm={6} lg={3}>
                  <OverviewTotalCustomers
                    positive={1}
                    sx={{ height: "100%" }}
                    value={ctx.data.customers}
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={3}>
                  <OverviewTasksProgress sx={{ height: "100%" }} value={ctx.data.pendingOrders} />
                </Grid>
                {/* <Grid xs={12} sm={6} lg={3}>
                  <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
                </Grid> */}
                <Grid alignItems={"center"} xs={12} lg={8}>
                  <OverviewSales chartSeries={ctx.data.sales} sx={{ height: "100%" }} />
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                  {/* <OverviewTraffic
                  chartSeries={[63, 15, 22]}
                  labels={['Desktop', 'Tablet', 'Phone']}
                  sx={{ height: '100%' }}
                /> */}
                </Grid>
                <Grid xs={12} md={6} lg={4}>
                  <OverviewLatestProducts products={ctx.data.services} sx={{ height: "100%" }} />
                </Grid>
                
                <Grid xs={12} md={12} lg={8}>
                  <OverviewLatestOrders orders={ctx.data.orders} sx={{ height: "100%" }} />
                </Grid>
              </Grid>
            </Container>
          )
        ):"Please Reload Page" }
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
