import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { ProduccionForm } from "../components/Producciones";

export const Produccion = () => {
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
          <ProduccionForm />
        </Grid>
      </Grid>
    </Container>
  );
};
