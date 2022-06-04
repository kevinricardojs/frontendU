import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchList } from "../../slices/configuraciones/socioNegociosSlice";
import EnhancedTable from "../MyTable";

export const SocioNegocioList = ({
  selected,
  setSelected,
  handleAdd,
  handleUpdate,
  handleDelete,
  loading,
  list,
}) => {
  const headCells = [
    {
      id: "id",
      align: "center",
      disablePadding: true,
      label: "Id",
    },
    {
      id: "nombre",
      align: "center",
      disablePadding: false,
      label: "Nombre",
    },
    {
      id: "nit",
      align: "center",
      disablePadding: false,
      label: "NIT",
    },
    {
      id: "direccion",
      align: "center",
      disablePadding: false,
      label: "Direccion",
    },
  ];
  const columns = [
    {
      name: "id",
      align: "center",
    },
    {
      name: "nombre",
      align: "center",
    },
    {
      name: "nit",
      align: "center",
    },
    {
      name: "direccion",
      align: "center",
    },
  ];
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);

  return (
    <>
      {!loading && (
        <EnhancedTable
          headCells={headCells}
          rows={list}
          columns={columns}
          title="Socios de Negocio"
          selected={selected}
          setSelected={setSelected}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
        />
      )}
    </>
  );
};
