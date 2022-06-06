import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import apiClient from "../../servicios/ClienteHttp";
import {
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { showError, showSuccess } from "../../slices/snackSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchList as fetchListaMateriales } from "../../slices/listaMaterialesSlice";
import { fetchList as fetchProductos } from "../../slices/productos/productosSlice";
import { add, update } from "../../slices/produccionesSlice";

export const ProduccionForm = ({ modeEdit, datos }) => {
  const { list: listaMateriales } = useSelector((state) => state.listaMaterial);
  const { list: productos } = useSelector((state) => state.producto);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    listaMaterialesID: Yup.number().min(0, "Debes seleccionar un producto"),
    cantidad: Yup.number(),
    detalles: Yup.array().of(
      Yup.object().shape({
        productoID: Yup.number().min(0, "Debes seleccionar un producto"),
        cantidad: Yup.number().min(0.01, "La cantidad debe ser mayor a cero"),
      })
    ),
  });
  const initialValues = {
    instrucciones: "",
    cantidad: 1,
    listaMaterialesID: "-1",
    detalles: [],
    submit: null,
  };
  const formik = useFormik({
    initialValues: initialValues,
    validateOnChange: true,
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      if (!modeEdit) {
        try {
          const json = JSON.stringify({ ...values });

          const { data } = await apiClient.post(`/producciones`, json);
          dispatch(showSuccess(`produccion #${data.id} Creada`));
          dispatch(add(data));
          formik.resetForm();
        } catch (e) {
          const erroMessage = e.response.data.error;
          dispatch(showError(`Error al crear el produccion ${erroMessage}`));
        }
      } else {
        try {
          const json = JSON.stringify({ ...values });

          await apiClient.put(`/producciones/${datos.id}`, json);
          dispatch(update({ ...values }));
          dispatch(showSuccess(`produccion actualizada`));
        } catch (e) {
          dispatch(showError("Error al actualizar el produccion"));
        }
      }
    },
  });
  useEffect(() => {
    dispatch(fetchListaMateriales());
    dispatch(fetchProductos());
  }, [dispatch]);

  useEffect(() => {
    if (formik.values.listaMaterialesID !== "-1") {
      const { materiales } = listaMateriales.find(
        (l) => l.id === formik.values.listaMaterialesID
      );
      const newMateriales = materiales.map((l) => ({
        ...l,
        cantidad: l.cantidad * formik.values.cantidad,
      }));
      formik.setFieldValue("detalles", newMateriales);
    }
  }, [formik.values.listaMaterialesID, formik.values.cantidad]);

  return (
    <Grid
      item
      md={12}
      xs={12}
      lg={12}
      sm={12}
      spacing={3}
      component="form"
      onSubmit={formik.handleSubmit}
      container
    >
      <Grid item md={12} xs={12} lg={12} sm={12}>
        <Typography variant="h2">Producir</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(
            formik.touched.listaMaterialesID && formik.errors.listaMaterialesID
          )}
        >
          <InputLabel id="listaMaterialesID">Lista Materiales</InputLabel>
          <Select
            labelId="listaMaterialesID"
            id="listaMaterialesID-select"
            name="listaMaterialesID"
            value={formik.values.listaMaterialesID}
            label="Lista Materiales"
            onChange={formik.handleChange}
            renderValue={(selected) => {
              if (selected !== "-1") {
                const { productoID } = listaMateriales.find(
                  (s) => s.id === selected
                );
                const { descripcion } = productos.find(
                  (s) => s.id === productoID
                );
                return descripcion;
              }
              return "Selecciona una Lista Materiales";
            }}
          >
            <MenuItem value="-1">Selecciona una Lista de Materiales</MenuItem>
            {listaMateriales.map((lista) => {
              const { descripcion } = productos.find(
                (s) => s.id === lista.productoID
              ) || { descripcion: "" };
              return (
                <MenuItem key={lista.id} value={lista.id}>
                  {descripcion}
                </MenuItem>
              );
            })}
          </Select>
          {Boolean(
            formik.touched.listaMaterialesID && formik.errors.listaMaterialesID
          ) && (
            <FormHelperText>{formik.errors.listaMaterialesID}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <TextField
          error={Boolean(formik.touched.cantidad && formik.errors.cantidad)}
          fullWidth
          helperText={formik.touched.cantidad && formik.errors.cantidad}
          label="Cantidad"
          margin="normal"
          placeholder="Ingresa la cantidad"
          name="cantidad"
          onBlur={formik.handleBlur}
          inputProps={{ min: 1 }}
          onChange={formik.handleChange}
          type="number"
          value={formik.values.cantidad}
          variant="outlined"
        />
      </Grid>
      <Grid item md={12} xs={12} lg={12} sm={12} container>
        <Grid item md={12} xs={12} lg={12} sm={12}>
          <Typography variant="h5">
            {formik.values.detalles.length} Materiales(s)
          </Typography>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" variant="head" align="center">
                  No
                </TableCell>
                <TableCell width="20%">Material</TableCell>
                <TableCell align="center">Cantidad Base</TableCell>
                <TableCell align="center">Cantidad Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formik.values.detalles.map(({ noLinea: index }) => {
                const { cantidad } = listaMateriales
                  .find((x) => x.id === formik.values.listaMaterialesID)
                  .materiales.find((m) => m.noLinea === index) || {
                  cantidad: 0,
                };
                return (
                  <TableRow key={index}>
                    <TableCell
                      variant="body"
                      padding="checkbox"
                      align="center"
                      size="small"
                    >
                      <Typography>
                        {formik.values.detalles[index].noLinea + 1}
                      </Typography>
                    </TableCell>
                    <TableCell variant="body" size="small" align="left">
                      <Typography>
                        {
                          productos.find(
                            (p) =>
                              p.id === formik.values.detalles[index].productoID
                          ).descripcion
                        }
                      </Typography>
                    </TableCell>
                    <TableCell variant="body" size="small" align="center">
                      <Typography>{cantidad}</Typography>
                    </TableCell>
                    <TableCell variant="body" size="small" align="center">
                      <Typography>
                        {formik.values.detalles[index].cantidad}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell size="small" colSpan={3} align="center">
                  <Typography variant="h4">Totales</Typography>
                </TableCell>
                <TableCell variant="footer" align="center" size="small">
                  <Typography variant="h5">
                    {formik.values.detalles.reduce(
                      (sum, { cantidad }) => sum + cantidad,
                      0
                    ) * formik.values.cantidad}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>

      <Grid item md={12} xs={12} lg={12} sm={12}>
        <FormControl margin="normal">
          <Button
            variant="contained"
            disabled={Boolean(
              Object.keys(formik.errors).length || formik.isSubmitting
            )}
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
    </Grid>
  );
};
