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
import { add, update } from "../../slices/productos/familiaProductosSlice";
import { fetchList } from "../../slices/presupuesto/cuentasSlice";

export const FamiliaProductoForm = ({ modeEdit, datos }) => {
  const dispatch = useDispatch();
  const { list: cuentas } = useSelector((state) => state.cuenta);
  const validationSchema = Yup.object({
    descripcion: Yup.string()
      .required("Debes ingresar el descripcion")
      .min(10, "El descripcion tiene un minimo de 10 caracteres"),
  });
  const initialValues = {
    descripcion: "",
    cuentaID: "-1",
    cuentaIDO: "-1",
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
            `/productos/FamiliaProductos`,
            json
          );
          dispatch(showSuccess(`Familia de productos #${data.id} Creada`));
          dispatch(add(data));
          formik.resetForm();
        } catch (e) {
          dispatch(showError("Error al crear la Familia de productos"));
        }
      } else {
        try {
          const json = JSON.stringify({ ...values });

          await apiClient.put(`/productos/FamiliaProductos/${datos.id}`, json);
          dispatch(update({ ...values }));
          dispatch(showSuccess(`Familia de productos actualizada`));
        } catch (e) {
          dispatch(showError("Error al actualizar la Familia de productos"));
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
        {modeEdit ? "Editar" : "Crea"} una Familia de productos
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
        <InputLabel id="cuentaID">Cuenta de Inventario</InputLabel>
        <Select
          labelId="cuentaID"
          id="cuentaID-select"
          name="cuentaID"
          value={formik.values.cuentaID}
          label="Cuenta de Inventario"
          onChange={formik.handleChange}
          renderValue={(selected) => {
            const { descripcion, codigoCuenta } = cuentas.find(
              (s) => s.id === selected
            ) || {
              descripcion: "Selecciona una cuenta",
              codigoCuenta: "",
            };
            return descripcion + " - " + codigoCuenta;
          }}
        >
          <MenuItem value="-1">Selecciona una cuenta</MenuItem>
          {cuentas.map((cuenta) => (
            <MenuItem key={cuenta.id} value={cuenta.id}>
              {cuenta.descripcion + " - " + cuenta.codigoCuenta}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" variant="standard">
        <InputLabel id="cuentaIDO">Cuenta de Venta</InputLabel>
        <Select
          labelId="cuentaIDO"
          id="cuentaIDO-select"
          name="cuentaIDO"
          value={formik.values.cuentaIDO}
          label="Cuenta de Venta"
          onChange={formik.handleChange}
          renderValue={(selected) => {
            const { descripcion, codigoCuenta } = cuentas.find(
              (s) => s.id === selected
            ) || {
              descripcion: "Selecciona una cuenta",
              codigoCuenta: "",
            };
            return descripcion + " - " + codigoCuenta;
          }}
        >
          <MenuItem value="-1">Selecciona una cuenta</MenuItem>
          {cuentas.map((cuenta) => (
            <MenuItem key={cuenta.id} value={cuenta.id}>
              {cuenta.descripcion + " - " + cuenta.codigoCuenta}
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
