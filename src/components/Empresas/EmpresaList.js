import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../../slices/configuraciones/empresasSlice";
import EnhancedTable from "../MyTable";

export const EmpresaList = ({
  selected,
  setSelected,
  handleAdd,
  handleUpdate,
  handleDelete,
}) => {
  const { loading, list } = useSelector((state) => state.empresa);
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
          title="Empresas"
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
