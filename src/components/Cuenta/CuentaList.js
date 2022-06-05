import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchList } from "../../slices/presupuesto/cuentasSlice";
import EnhancedTable from "../MyTable";

export const CuentaList = ({
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
      id: "nivel",
      align: "center",
      disablePadding: false,
      label: "Nivel",
    },
    {
      id: "descripcion",
      align: "center",
      disablePadding: false,
      label: "Descripcion",
    },
    {
      id: "codigoCuenta",
      align: "center",
      disablePadding: false,
      label: "Codigo de Cuenta",
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
          title="Socios de Negocio"
          selected={selected}
          setSelected={setSelected}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          selectable
        />
      )}
    </>
  );
};
