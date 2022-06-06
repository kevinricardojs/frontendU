import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiClient from "../../servicios/ClienteHttp";
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
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
    nivel: Yup.number().required("Debes ingresar el nivel"),
    descripcion: Yup.string()
      .required("Debes ingresar el descripcion")
      .min(5, "El descripcion tiene un minimo de 5 caracteres"),
    codigoCuenta: Yup.string()
      .required("Debes ingresar el codigoCuenta")
      .min(4, "El nivel tiene un minimo de 4 caracteres")
      .max(4, "El nivel tiene un maximo de 4 caracteres"),
  });
  const initialValues = {
    descripcion: "",
    codigoCuenta: "",
    nivel: 1,
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

          const { data } = await apiClient.post(`/presupuesto/cuentas`, json);
          dispatch(showSuccess(`Cuenta #${data.id} Creada`));
          dispatch(add(data));
          formik.resetForm();
        } catch (e) {
          dispatch(showError("Error al crear la Cuenta"));
        }
      } else {
        try {
          const json = JSON.stringify({ ...values });

          await apiClient.put(`/presupuesto/cuentas/${datos.id}`, json);
          dispatch(update({ ...values }));
          dispatch(showSuccess(`Cuenta actualizada`));
        } catch (e) {
          dispatch(showError("Error al actualizar la Cuenta"));
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
        {modeEdit ? "Editar" : "Crea"} un Cuenta
      </Typography>
      <FormControl fullWidth margin="normal">
        <TextField
          disabled={formik.isSubmitting}
          error={Boolean(
            formik.touched.descripcion && formik.errors.descripcion
          )}
          fullWidth
          helperText={formik.touched.descripcion && formik.errors.descripcion}
          label="Descripcion"
          margin="normal"
          placeholder="Ingresa el descripcion de la Cuenta"
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
          disabled={formik.isSubmitting}
          error={Boolean(
            formik.touched.codigoCuenta && formik.errors.codigoCuenta
          )}
          fullWidth
          helperText={formik.touched.codigoCuenta && formik.errors.codigoCuenta}
          label="Codigo de Cuenta"
          margin="normal"
          placeholder="Ingresa el Codigo Cuenta"
          name="codigoCuenta"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.codigoCuenta}
          variant="outlined"
        />
      </FormControl>
      <FormControl margin="normal" disabled={formik.isSubmitting}>
        <FormLabel id="demo-radio-buttons-group-label">Nivel</FormLabel>
        <RadioGroup
          value={formik.values.nivel}
          name="nivel"
          onChange={formik.handleChange}
        >
          <FormControlLabel value="1" control={<Radio />} label="Nivel 1" />
          <FormControlLabel value="2" control={<Radio />} label="Nivel 2" />
        </RadioGroup>
      </FormControl>
      <br />
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
