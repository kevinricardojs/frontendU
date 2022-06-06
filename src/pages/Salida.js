import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { SalidaForm } from "../components/Salida";

export const Salida = () => {
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
          <SalidaForm />
        </Grid>
      </Grid>
    </Container>
  );
};
