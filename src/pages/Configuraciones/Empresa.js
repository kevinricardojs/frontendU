import { Container, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import { EmpresaForm } from "../../components/Empresas";
import { EmpresaList } from "../../components/Empresas/EmpresaList";
import { ModalForm } from "../../components/ModalForm";

export const Empresa = () => {
  const [selected, setSelected] = useState({ id: -1 });
  const [openModal, setOpenModal] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);

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
        <EmpresaList
          selected={selected}
          setSelected={setSelected}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      </Grid>
      <ModalForm
        open={openModal}
        onClose={handleClose}
        title="empresa"
        descripcion="empresa-des"
      >
        <Grid component={Paper}>
          <EmpresaForm modeEdit={modeEdit} datos={selected} />
        </Grid>
      </ModalForm>
    </Container>
  );
};
