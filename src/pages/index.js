import Head from "next/head";
import { subDays, subHours } from "date-fns";
import {
  Box,
  CircularProgress,
  Container,
  Unstable_Grid2 as Grid,
  Typography,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { useContext } from "react";
import { adminContext } from "src/contexts/admin-context";
import moneySplitter from "src/utils/money-splitter";

const now = new Date();

const Page = () => {
  const ctx = useContext(adminContext);
  return (
    <>
      <Head>
        <title>Overview | JosPat Admin</title>
      </Head>
      {ctx.loading ? (
        <CircularProgress size={28} />
      ) : !ctx.error ? (
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth="xl">
            <Grid container spacing={3}>
              <Grid xs={12} sm={6} lg={3}>
                <OverviewBudget
                  difference={12}
                  positive
                  sx={{ height: "100%" }}
                  value={`NGN ${
                    ctx.data.transactions._sum.fee >= 1000
                      ? moneySplitter(ctx.data.transactions._sum.fee / 1000) + "K"
                      : moneySplitter(ctx.data.transactions._sum.fee)
                  }`}
                />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <OverviewTotalCustomers
                  difference={16}
                  positive={false}
                  sx={{ height: "100%" }}
                  value={ctx.data.customers.length}
                />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <OverviewTasksProgress sx={{ height: "100%" }} value={ctx.data.pendingOrders} />
              </Grid>
              <Grid xs={12} sm={6} lg={3}>
                <OverviewTotalProfit
                  sx={{ height: "100%" }}
                  value={`NGN ${
                    ctx.data.transactions._sum.amount >= 1000
                      ? moneySplitter(ctx.data.transactions._sum.amount / 1000) + "K"
                      : moneySplitter(ctx.data.transactions._sum.amount)
                  }`}
                />
              </Grid>
              <Grid xs={12} lg={8}>
                <OverviewSales chartSeries={ctx.data.sales} sx={{ height: "100%" }} />
              </Grid>
              <Grid xs={12} md={6} lg={4}>
                <OverviewTraffic
                  chartSeries={[63, 15, 22]}
                  labels={["Desktop", "Tablet", "Phone"]}
                  sx={{ height: "100%" }}
                />
              </Grid>
              <Grid xs={12} md={6} lg={4}>
                <OverviewLatestProducts
                  products={ctx.data.services.slice(0, 6)}
                  sx={{ height: "100%" }}
                />
              </Grid>
              <Grid xs={12} md={12} lg={8}>
                <OverviewLatestOrders
                  orders={ctx.data.orders.slice(0, 7)}
                  sx={{ height: "100%" }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      ) : (
        <Typography>An Error Occurred, Please Refresh your browser</Typography>
      )}
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
