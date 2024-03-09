import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import { withAuthGuard } from "src/hocs/with-auth-guard";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import axiosInstance from "src/api/axios";
import { useRouter } from "next/router";

const SIDE_NAV_WIDTH = 280;

export const adminContext = createContext({
  loading: false,
  error: "",
  data: null
});

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    // paddingLeft: SIDE_NAV_WIDTH
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const Layout = withAuthGuard((props) => {
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({});
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    // console.log(window.sessionStorage.getItem("sid"))
    try {
      const response = await axiosInstance.get("/admin", {
        headers: {
          Authorization: `Bearer ${
            typeof window != "undefined" && window.sessionStorage.getItem("sid")
          }`,
        },
      });
      setData(response.data.data);
    } catch (err) {
      setError(err);
      if (typeof err.response.data != "undefined") {
        if (err.response.data.msg.match("Expired")) {
          router.push("/auth/login");
        }

        setError(err.response.data.msg);
      }
      setError("Check your internet Connection");
    } finally {
      setLoading(false);
    }
  };

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
      fetchData();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <adminContext.Provider value={{ loading, error, data }}>
      <TopNav onNavOpen={() => setOpenNav(true)} />
      {/* <SideNav
        onClose={() => setOpenNav(false)}
        open={false}
      /> */}
      <LayoutRoot>
        <LayoutContainer>{children}</LayoutContainer>
      </LayoutRoot>
    </adminContext.Provider>
  );
});
