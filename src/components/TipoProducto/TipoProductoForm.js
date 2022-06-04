import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiClient from "../../servicios/ClienteHttp";
import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { showError, showSuccess } from "../../slices/snackSlice";
import { useDispatch } from "react-redux";
import { add, update } from "../../slices/productos/tipoProductosSlice";

export const TipoProductoForm = ({ modeEdit, datos }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    descripcion: Yup.string()
      .required("Debes ingresar el descripcion")
      .min(5, "El descripcion tiene un minimo de 5 caracteres"),
  });
  const initialValues = {
    descripcion: "",
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

          const { data } = await apiClient.post(
            `/productos/ProductoTipos`,
            json
          );
          dispatch(showSuccess(`Tipo de Producto #${data.id} Creada`));
          dispatch(add(data));
          formik.resetForm();
        } catch (e) {
          dispatch(showError("Error al crear el Tipo de Producto"));
        }
      } else {
        try {
          const json = JSON.stringify({ ...values });

          await apiClient.put(`/productos/ProductoTipos/${datos.id}`, json);
          dispatch(update({ ...values }));
          dispatch(showSuccess(`Tipo de Producto actualizada`));
        } catch (e) {
          dispatch(showError("Error al actualizar el Tipo de Producto"));
        }
      }
    },
  });
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
        {modeEdit ? "Editar" : "Crea"} una Tipo de Producto
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
