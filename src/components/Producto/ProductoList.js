import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchList } from "../../slices/productos/productosSlice";
import EnhancedTable from "../MyTable";

export const ProductoList = ({
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
      id: "productoTipoID",
      align: "center",
      disablePadding: false,
      label: "ProductoTipoID",
    },
    {
      id: "familiaProductoID",
      align: "center",
      disablePadding: false,
      label: "FamiliaProductoID",
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
          title="Productos"
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
