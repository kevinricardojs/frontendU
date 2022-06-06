import { Grid, Paper } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { ListaMaterialForm } from "../components/ListaMateriales";

export const ListaMaterial = () => {
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
          <ListaMaterialForm />
        </Grid>
      </Grid>
    </Container>
  );
};
