import { Container, Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ModalForm } from "../../components/ModalForm";
import {
  TipoProductoForm,
  TipoProductoList,
} from "../../components/TipoProducto";

export const TipoProducto = () => {
  const [selected, setSelected] = useState({ id: -1 });
  const [openModal, setOpenModal] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);
  const { loading, list } = useSelector((state) => state.tipoProducto);

  const handleAdd = () => {
    setModeEdit(false);
    setOpenModal(true);
  };
  const handleUpdate = async () => {
    setModeEdit(true);
    setOpenModal(true);
  };
  const handleDelete = () => {};
  const handleClose = () => {
    setModeEdit(false);
    setOpenModal(false);
  };
  useEffect(() => {
    if (selected.id !== -1) {
      const s = list.find((l) => l.id === selected.id);
      setSelected(s);
    }
  }, [list, selected.id]);

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
        <TipoProductoList
          selected={selected}
          setSelected={setSelected}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          loading={loading}
          list={list}
        />
      </Grid>
      <ModalForm open={openModal} handleClose={handleClose}>
        <Grid component={Paper}>
          <TipoProductoForm modeEdit={modeEdit} datos={selected} />
        </Grid>
      </ModalForm>
    </Container>
  );
};
