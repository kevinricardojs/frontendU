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
import { add, update } from "../../slices/configuraciones/empresasSlice";

export const EmpresaForm = ({ modeEdit, datos }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("Debes ingresar el nombre")
      .min(10, "El nombre tiene un minimo de 10 caracteres"),
    nit: Yup.string()
      .required("Debes ingresar el NIT")
      .min(13, "El nombre tiene un minimo de 13 caracteres")
      .max(13, "El nombre tiene un maximo de 13 caracteres"),
  });
  const initialValues = {
    nombre: "",
    nit: "",
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
            `/configuraciones/empresas`,
            json
          );
          dispatch(showSuccess(`Empresa #${data.id} Creada`));
          dispatch(add(data));
          formik.resetForm();
        } catch (e) {
          dispatch(showError("Error al crear la empresa"));
        }
      } else {
        try {
          const json = JSON.stringify({ ...values });

          await apiClient.put(`/configuraciones/empresas/${datos.id}`, json);
          dispatch(update({ ...values }));
          dispatch(showSuccess(`Empresa actualizada`));
        } catch (e) {
          dispatch(showError("Error al actualizar la empresa"));
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
        {modeEdit ? "Editar" : "Crea"} una empresa
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          error={Boolean(formik.touched.nombre && formik.errors.nombre)}
          fullWidth
          helperText={formik.touched.nombre && formik.errors.nombre}
          label="Nombre empresa"
          margin="normal"
          placeholder="Ingresa el nombre de la empresa"
          name="nombre"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.nombre}
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          error={Boolean(formik.touched.nit && formik.errors.nit)}
          fullWidth
          helperText={formik.touched.nit && formik.errors.nit}
          label="Nit"
          margin="normal"
          placeholder="Ingresa el nit de la empresa"
          name="nit"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.nit}
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
