import React from "react";
import { Box, CircularProgress, Grid } from "@mui/material";

import Logo from "../../assets/img/logo.png";

export const LoaderGlobal = () => {
  return (
    <Box width="300px" height="300px" marginTop="15%" marginLeft="40%">
      <Grid
        container
        justifyContent="space-around"
        direction="column"
        alignItems="center"
        spacing={2}
      >
        <Grid item md={12}>
          <img
            src={Logo}
            alt="logo"
            style={{ width: "150px", height: "120px" }}
          />
        </Grid>
        <Grid item md={12}>
          <CircularProgress thickness={4} />
        </Grid>
      </Grid>
    </Box>
  );
};
