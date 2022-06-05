import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchList } from "../../slices/configuraciones/sucursalesSlice";
import EnhancedTable from "../MyTable";

export const SucursalList = ({
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
      name: "descripcion",
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
          title="Sucursal"
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
