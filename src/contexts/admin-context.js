import { createContext, useEffect, useRef, useState } from "react";
import axiosInstance from "src/config/axios";

export const adminContext = createContext({
  loading: true,
  error: "",
  data: {},
});

export const AdminProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({});

  const initialized = useRef(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin");
      console.log(response);
      setData(response.data.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialized.current) {
        return;
    }
    initialized.current = true;

    fetchData();
  }, []);
  return (
    <adminContext.Provider
      value={{
        data,
        loading,
        error,
      }}
    >
      {children}
    </adminContext.Provider>
  );
};
