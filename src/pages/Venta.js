import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { VentaForm } from "../components/Venta";

export const Venta = () => {
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
          <VentaForm />
        </Grid>
      </Grid>
    </Container>
  );
};
