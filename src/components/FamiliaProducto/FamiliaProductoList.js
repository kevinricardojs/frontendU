import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchList } from "../../slices/productos/familiaProductosSlice";
import EnhancedTable from "../MyTable";

export const FamiliaProductoList = ({
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
      id: "descripcion",
      align: "center",
      disablePadding: false,
      label: "Descripcion",
    },
    {
      id: "cuentaID",
      align: "center",
      disablePadding: false,
      label: "CuentaID",
    },
    {
      id: "cuentaIDO",
      align: "center",
      disablePadding: false,
      label: "CuentaIDO",
    },
  ];
  const columns = [
    {
      name: "id",
      align: "center",
    },
    {
      name: "descripcion",
      align: "center",
    },
    {
      name: "cuentaID",
      align: "center",
    },
    {
      name: "cuentaIDO",
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
          title="Familia de Producto"
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
