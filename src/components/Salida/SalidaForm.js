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
  IconButton,
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
import { fetchList as fetchProductos } from "../../slices/productos/productosSlice";
import { add, update } from "../../slices/salidasSlice";
import { AddCircle, Delete } from "@mui/icons-material";

export const SalidaForm = ({ modeEdit, datos }) => {
  const { list: detalles } = useSelector((state) => state.producto);
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    comentarios: Yup.string(),
    detalles: Yup.array().of(
      Yup.object().shape({
        productoID: Yup.number().min(0, "Debes seleccionar un producto"),
        cantidad: Yup.number().min(0.01, "La cantidad debe ser mayor a cero"),
      })
    ),
  });
  const initialValues = {
    comentarios: "",
    detalles: [
      {
        productoID: -1,
        noLinea: 0,
        cantidad: 0,
      },
    ],
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

          const { data } = await apiClient.post(`/salidas`, json);
          dispatch(showSuccess(`salida #${data.id} Creada`));
          dispatch(add(data));
          formik.resetForm();
        } catch (e) {
          dispatch(showError("Error al crear el salida"));
        }
      } else {
        try {
          const json = JSON.stringify({ ...values });

          await apiClient.put(`/salidas/${datos.id}`, json);
          dispatch(update({ ...values }));
          dispatch(showSuccess(`salida actualizada`));
        } catch (e) {
          dispatch(showError("Error al actualizar el salida"));
        }
      }
    },
  });
  const addBlankDetalle = () => {
    const newdetalles = [
      ...formik.values.detalles,
      {
        productoID: -1,
        noLinea: formik.values.detalles.length,
        cantidad: 0,
      },
    ];
    formik.setFieldValue("detalles", newdetalles);
  };

  const deleteDetalle = (noLinea) => {
    const newdetalles = formik.values.detalles
      .filter((d) => d.noLinea !== noLinea)
      .map((d, index) => ({ ...d, noLinea: index }));
    formik.setFieldValue("detalles", newdetalles);
  };
  useEffect(() => {
    dispatch(fetchProductos());
  }, [dispatch]);
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
        <Typography variant="h2">
          {modeEdit ? "Editar" : "Crea"} una Salida
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <TextField
          error={Boolean(
            formik.touched.comentarios && formik.errors.comentarios
          )}
          fullWidth
          helperText={formik.touched.comentarios && formik.errors.comentarios}
          label="comentarios"
          margin="normal"
          placeholder="Ingresa el comentarios"
          name="comentarios"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.comentarios}
          variant="outlined"
        />
      </Grid>
      <Grid item md={12} xs={12} lg={12} sm={12} container>
        <Grid item md={12} xs={12} lg={12} sm={12}>
          <Typography variant="h5">
            {formik.values.detalles.length} Detalles(s)
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
                <TableCell align="center">Cantidad</TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {formik.values.detalles.map(({ noLinea: index }) => {
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
                    <TableCell variant="body" size="small">
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={Boolean(
                          formik.touched.detalles?.[index]?.productoID &&
                            formik.errors.detalles?.[index]?.productoID
                        )}
                      >
                        <InputLabel id="productoID">Material</InputLabel>
                        <Select
                          labelId="productoID"
                          size="small"
                          id="productoID-select"
                          name={`detalles[${index}].productoID`}
                          value={formik.values.detalles[index].productoID}
                          label="Material"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          renderValue={(selected) => {
                            const { descripcion } = detalles.find(
                              (s) => s.id === selected
                            ) || {
                              descripcion: "Selecciona un Material",
                            };
                            return descripcion;
                          }}
                        >
                          <MenuItem value="-1">Selecciona un Material</MenuItem>
                          {detalles.map((producto) => (
                            <MenuItem key={producto.id} value={producto.id}>
                              {producto.descripcion}
                            </MenuItem>
                          ))}
                        </Select>
                        {Boolean(
                          formik.touched.detalles?.[index]?.productoID &&
                            formik.errors.detalles?.[index]?.productoID
                        ) && (
                          <FormHelperText>
                            {formik.errors.detalles?.[0]?.productoID}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </TableCell>
                    <TableCell variant="body" size="small">
                      <TextField
                        fullWidth
                        label="Cantidad"
                        margin="normal"
                        size="small"
                        placeholder="Cantidad"
                        name={`detalles[${index}].cantidad`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.detalles[index].cantidad}
                        variant="outlined"
                        error={Boolean(
                          formik.touched.detalles?.[index]?.cantidad &&
                            formik.errors.detalles?.[index]?.cantidad
                        )}
                        helperText={
                          formik.touched.detalles?.[index]?.cantidad &&
                          formik.errors.detalles?.[0]?.cantidad
                        }
                      />
                    </TableCell>
                    <TableCell variant="body" size="small" align="center">
                      <IconButton
                        color="error"
                        onClick={() => {
                          deleteDetalle(index);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow>
                <TableCell size="small" colSpan={2} align="right">
                  <Typography variant="h4">Totales</Typography>
                </TableCell>
                <TableCell variant="footer" align="center" size="small">
                  <Typography variant="h5">
                    {formik.values.detalles.reduce(
                      (sum, { cantidad }) => sum + cantidad,
                      0
                    )}
                  </Typography>
                </TableCell>
                <TableCell size="small" />
                <TableCell
                  variant="footer"
                  colSpan={2}
                  align="right"
                  size="small"
                >
                  <IconButton color="success" onClick={addBlankDetalle}>
                    <AddCircle />
                  </IconButton>
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
