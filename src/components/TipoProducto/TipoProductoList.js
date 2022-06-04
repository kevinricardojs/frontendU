import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchList } from "../../slices/productos/tipoProductosSlice";
import EnhancedTable from "../MyTable";

export const TipoProductoList = ({
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
    }
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
          title="Tipos de Producto"
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
