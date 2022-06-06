import { Grid, Paper, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../slices/listaMaterialesSlice";
import EnhancedTable from "../components/MyTable";

export const ListaMaterialList = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.listaMaterial);
  const headCells = [
    {
      id: "id",
      align: "center",
      label: "ID",
    },
    {
      id: "creado",
      align: "center",
      label: "Creado",
    },
    {
      id: "cliente",
      align: "center",
      label: "Cliente",
    },
    {
      id: "facturaSerie",
      align: "center",
      label: "Serie Factura",
    },
    {
      id: "cantidad",
      align: "center",
      label: "Cantidad",
    },
    {
      id: "total",
      align: "center",
      label: "Total",
    },
  ];
  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);
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
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Typography variant="h3">Lista de Materiales realizadas</Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <EnhancedTable headCells={headCells} rows={list} />
        </Grid>
      </Grid>
    </Container>
  );
};
