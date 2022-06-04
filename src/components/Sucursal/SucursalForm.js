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
import { add, update } from "../../slices/configuraciones/sucursalesSlice";
import { fetchList } from "../../slices/configuraciones/empresasSlice";

export const SucursalForm = ({ modeEdit, datos }) => {
  const dispatch = useDispatch();
  const { list: empresas } = useSelector((state) => state.empresa);
  const validationSchema = Yup.object({
    descripcion: Yup.string()
      .required("Debes ingresar el descripcion")
      .min(10, "El descripcion tiene un minimo de 10 caracteres"),
    direccion: Yup.string()
      .required("Debes ingresar el direccion")
      .min(5, "El descripcion tiene un minimo de 5 caracteres")
      .max(5, "El descripcion tiene un maximo de 5 caracteres"),
  });
  const initialValues = {
    descripcion: "",
    direccion: "",
    empresaID: "-1",
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
            `/configuraciones/Sucursales`,
            json
          );
          dispatch(showSuccess(`Sucursal #${data.id} Creada`));
          dispatch(add(data));
          formik.resetForm();
        } catch (e) {
          dispatch(showError("Error al crear la Sucursal"));
        }
      } else {
        try {
          const json = JSON.stringify({ ...values });

          await apiClient.put(`/configuraciones/Sucursales/${datos.id}`, json);
          dispatch(update({ ...values }));
          dispatch(showSuccess(`Sucursal actualizada`));
        } catch (e) {
          dispatch(showError("Error al actualizar la Sucursal"));
        }
      }
    },
  });

  useEffect(() => {
    dispatch(fetchList());
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
        {modeEdit ? "Editar" : "Crea"} una Sucursal
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
          placeholder="Ingresa el descripcion de la Sucursal"
          name="descripcion"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.descripcion}
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <TextField
          error={Boolean(formik.touched.direccion && formik.errors.direccion)}
          fullWidth
          helperText={formik.touched.direccion && formik.errors.direccion}
          label="Direccion"
          margin="normal"
          placeholder="Ingresa el direccion de la Sucursal"
          name="direccion"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.direccion}
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth margin="normal" variant="standard">
        <InputLabel id="empresaID">Empresa</InputLabel>
        <Select
          labelId="empresaID"
          id="empresaID-select"
          name="empresaID"
          value={formik.values.empresaID}
          label="Empresa"
          onChange={formik.handleChange}
          renderValue={(selected) => {
            const { nombre } = empresas.find((s) => s.id === selected) || {
              nombre: "Selecciona una empresa",
            };
            return nombre.substring(0, 20) + "...";
          }}
        >
          <MenuItem value="-1">Selecciona una empresa</MenuItem>
          {empresas.map((empresa) => (
            <MenuItem key={empresa.id} value={empresa.id}>
              {empresa.nombre}
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
