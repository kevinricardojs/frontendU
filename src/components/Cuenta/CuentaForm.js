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
import { add, update } from "../../slices/presupuesto/cuentasSlice";

export const CuentaForm = ({ modeEdit, datos }) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("Debes ingresar el nombre")
      .min(10, "El nombre tiene un minimo de 10 caracteres"),
    telefono: Yup.string()
      .required("Debes ingresar el telefono")
      .min(8, "El nombre tiene un minimo de 8 caracteres")
      .max(8, "El nombre tiene un maximo de 8 caracteres"),
    direccion: Yup.string()
      .required("Debes ingresar el direccion")
      .min(5, "El direccion tiene un minimo de 5 caracteres"),
    nit: Yup.string()
      .required("Debes ingresar el NIT")
      .min(13, "El nombre tiene un minimo de 13 caracteres")
      .max(13, "El nombre tiene un maximo de 13 caracteres"),
  });
  const initialValues = {
    nombre: "",
    telefono: "",
    direccion: "",
    nit: "",
    tipo: "0",
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
            `/prespuesto/cuentas`,
            json
          );
          dispatch(showSuccess(`Socio de Negocio #${data.id} Creada`));
          dispatch(add(data));
          formik.resetForm();
        } catch (e) {
          dispatch(showError("Error al crear la Socio de Negocio"));
        }
      } else {
        try {
          const json = JSON.stringify({ ...values });

          await apiClient.put(
            `/prespuesto/cuentas/${datos.id}`,
            json
          );
          dispatch(update({ ...values }));
          dispatch(showSuccess(`Socio de Negocio actualizada`));
        } catch (e) {
          dispatch(showError("Error al actualizar la Socio de Negocio"));
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
        {modeEdit ? "Editar" : "Crea"} un Socio de Negocio
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          disabled={formik.isSubmitting}
          error={Boolean(formik.touched.nombre && formik.errors.nombre)}
          fullWidth
          helperText={formik.touched.nombre && formik.errors.nombre}
          label="Nombre"
          margin="normal"
          placeholder="Ingresa el nombre de la Socio de Negocio"
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
          disabled={formik.isSubmitting}
          error={Boolean(formik.touched.direccion && formik.errors.direccion)}
          fullWidth
          helperText={formik.touched.direccion && formik.errors.direccion}
          label="Direccion"
          margin="normal"
          placeholder="Ingresa el direccion de la Socio de Negocio"
          name="direccion"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.direccion}
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          disabled={formik.isSubmitting}
          error={Boolean(formik.touched.nit && formik.errors.nit)}
          fullWidth
          helperText={formik.touched.nit && formik.errors.nit}
          label="Nit"
          margin="normal"
          placeholder="Ingresa el nit"
          name="nit"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.nit}
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          disabled={formik.isSubmitting}
          error={Boolean(formik.touched.telefono && formik.errors.telefono)}
          fullWidth
          helperText={formik.touched.telefono && formik.errors.telefono}
          label="telefono"
          margin="normal"
          placeholder="Ingresa el telefono"
          name="telefono"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="tel"
          value={formik.values.telefono}
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
