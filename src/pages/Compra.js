import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { CompraForm } from "../components/Compra";

export const Compra = () => {
  return (
    <Container fixed>
      <Grid
        container
        spacing={2}
        component={Paper}
        marginTop={2}
        padding={1}
        elevation={1}
      >
        <Grid>
          <CompraForm />
        </Grid>
      </Grid>
    </Container>
  );
};
