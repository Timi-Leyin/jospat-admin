import { CircularProgress, Box } from "@mui/material";
import React from "react";

const Progress = ({ loading = false }) => {
  return (
    loading && (
      <Box
        display={"flex"}
        className={`modal-backdrop${loading ? " show" : ""}`}
        width="100vw"
        height="100vh"
        justifyContent={"center"}
        alignItems="center"
      >
        <CircularProgress
          color="primary"
          sx={{ width: "100%" }}
          variant="indeterminate"
        />
      </Box>
    )
  );
};

export default Progress;
