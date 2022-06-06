import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiClient from "../../servicios/ClienteHttp";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { showError, showSuccess } from "../../slices/snackSlice";
import { useDispatch, useSelector } from "react-redux";
import { add, update } from "../../slices/productos/productosSlice";
import { fetchList as fetchFamilias } from "../../slices/productos/familiaProductosSlice";
import { fetchList as fetchTipos } from "../../slices/productos/tipoProductosSlice";

export const ProductoForm = ({ modeEdit, datos }) => {
  const dispatch = useDispatch();
  const { list: tipos } = useSelector((state) => state.tipoProducto);
  const { list: familias } = useSelector((state) => state.familiaProducto);
  const validationSchema = Yup.object({
    descripcion: Yup.string()
      .required("Debes ingresar el descripcion")
      .min(5, "El descripcion tiene un minimo de 5 caracteres"),
  });
  const initialValues = {
    descripcion: "",
    productoTipoID: "-1",
    familiaProductoID: "-1",
    submit: null,
  };
  const formik = useFormik({
    initialValues: modeEdit ? datos : initialValues,
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      if (!modeEdit) {
        try {
          const json = JSON.stringify({ ...values });

          const { data } = await apiClient.post(`/productos/Productos`, json);
          dispatch(showSuccess(`Producto #${data.id} Creado`));
          dispatch(add(data));
          formik.resetForm();
        } catch (e) {
          dispatch(showError("Error al crear el Producto"));
        }
      } else {
        try {
          const json = JSON.stringify({ ...values });

          await apiClient.put(`/productos/Productos/${datos.id}`, json);
          dispatch(update({ ...values }));
          dispatch(showSuccess(`Producto actualizado`));
        } catch (e) {
          dispatch(showError("Error al actualizar el Producto"));
        }
      }
    },
  });

  useEffect(() => {
    dispatch(fetchFamilias());
    dispatch(fetchTipos());
  }, [dispatch]);
  return (
    <Grid
      item
      md={12}
      xs={12}
      lg={12}
      sm={12}
      padding={1}
      component="form"
      onSubmit={formik.handleSubmit}
    >
      <Typography variant="h2">
        {modeEdit ? "Editar" : "Crea"} un Producto
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          error={Boolean(
            formik.touched.descripcion && formik.errors.descripcion
          )}
          fullWidth
          helperText={formik.touched.descripcion && formik.errors.descripcion}
          label="Descripcion"
          margin="normal"
          placeholder="Ingresa el descripcion"
          name="descripcion"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.descripcion}
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth margin="normal" variant="standard">
        <InputLabel id="productoTipoID">Tipo de producto</InputLabel>
        <Select
          labelId="productoTipoID"
          id="productoTipoID-select"
          name="productoTipoID"
          value={formik.values.productoTipoID}
          label="Tipo de producto"
          onChange={formik.handleChange}
          renderValue={(selected) => {
            const { descripcion } = tipos.find((s) => s.id === selected) || {
              descripcion: "Selecciona un tipo de producto",
            };
            return descripcion;
          }}
        >
          <MenuItem value="-1">Selecciona un tipo de producto</MenuItem>
          {tipos.map((tipo) => (
            <MenuItem key={tipo.id} value={tipo.id}>
              {tipo.descripcion}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" variant="standard">
        <InputLabel id="familiaProductoID">Familia de producto</InputLabel>
        <Select
          labelId="familiaProductoID"
          id="familiaProductoID-select"
          name="familiaProductoID"
          value={formik.values.familiaProductoID}
          label="Familia de producto"
          onChange={formik.handleChange}
          renderValue={(selected) => {
            const { descripcion } = familias.find((s) => s.id === selected) || {
              descripcion: "Selecciona una familia",
            };
            return descripcion;
          }}
        >
          <MenuItem value="-1">Selecciona una familia</MenuItem>
          {familias.map((familia) => (
            <MenuItem key={familia.id} value={familia.id}>
              {familia.descripcion}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl margin="normal">
        <Button
          variant="contained"
          disabled={formik.isSubmitting}
          type="submit"
          endIcon={
            formik.isSubmitting ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <SaveIcon />
            )
          }
        >
          Guardar
        </Button>
      </FormControl>
    </Grid>
  );
};
