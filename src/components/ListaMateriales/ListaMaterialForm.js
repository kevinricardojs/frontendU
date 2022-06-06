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
import { add, update } from "../../slices/listaMaterialesSlice";
import { AddCircle, Delete } from "@mui/icons-material";

export const ListaMaterialForm = ({ modeEdit, datos }) => {
  const productosFabricar = useSelector((state) =>
    state.producto.list.filter((s) => s.familiaProductoID === 2)
  );
  const materiales = useSelector((state) =>
    state.producto.list.filter((s) => s.familiaProductoID === 1)
  );
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    productoID: Yup.number().min(0, "Debes seleccionar un producto"),
    instrucciones: Yup.string(),
    cantidad: Yup.number(),
    materiales: Yup.array().of(
      Yup.object().shape({
        productoID: Yup.number().min(0, "Debes seleccionar un producto"),
        cantidad: Yup.number().min(0.01, "La cantidad debe ser mayor a cero"),
        instrucciones: Yup.string(),
      })
    ),
  });
  const initialValues = {
    instrucciones: "",
    cantidad: 1,
    productoID: "-1",
    materiales: [
      {
        productoID: -1,
        noLinea: 0,
        cantidad: 0,
        instrucciones: "",
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

          const { data } = await apiClient.post(`/ListaMateriales`, json);
          dispatch(showSuccess(`ListaMaterial #${data.id} Creada`));
          dispatch(add(data));
          formik.resetForm();
        } catch (e) {
          dispatch(showError("Error al crear el ListaMaterial"));
        }
      } else {
        try {
          const json = JSON.stringify({ ...values });

          await apiClient.put(`/ListaMateriales/${datos.id}`, json);
          dispatch(update({ ...values }));
          dispatch(showSuccess(`ListaMaterial actualizada`));
        } catch (e) {
          dispatch(showError("Error al actualizar el ListaMaterial"));
        }
      }
    },
  });
  const addBlankDetalle = () => {
    const newmateriales = [
      ...formik.values.materiales,
      {
        productoID: -1,
        noLinea: formik.values.materiales.length,
        cantidad: 0,
        instrucciones: "",
      },
    ];
    formik.setFieldValue("materiales", newmateriales);
  };

  const deleteDetalle = (noLinea) => {
    const newmateriales = formik.values.materiales
      .filter((d) => d.noLinea !== noLinea)
      .map((d, index) => ({ ...d, noLinea: index }));
    formik.setFieldValue("materiales", newmateriales);
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
          {modeEdit ? "Editar" : "Crea"} una Lista de Materiales
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(formik.touched.productoID && formik.errors.productoID)}
        >
          <InputLabel id="productoID">Producto</InputLabel>
          <Select
            labelId="productoID"
            id="productoID-select"
            name="productoID"
            value={formik.values.productoID}
            label="Producto"
            onChange={formik.handleChange}
            renderValue={(selected) => {
              const { descripcion } = productosFabricar.find(
                (s) => s.id === selected
              ) || {
                descripcion: "Selecciona un Producto",
              };
              return descripcion;
            }}
          >
            <MenuItem value="-1">Selecciona un Producto</MenuItem>
            {productosFabricar.map((producto) => (
              <MenuItem key={producto.id} value={producto.id}>
                {producto.descripcion}
              </MenuItem>
            ))}
          </Select>
          {Boolean(formik.touched.productoID && formik.errors.productoID) && (
            <FormHelperText>{formik.errors.productoID}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <TextField
          error={Boolean(
            formik.touched.instrucciones && formik.errors.instrucciones
          )}
          fullWidth
          helperText={
            formik.touched.instrucciones && formik.errors.instrucciones
          }
          label="Instrucciones"
          margin="normal"
          placeholder="Ingresa el Instrucciones"
          name="instrucciones"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.instrucciones}
          variant="outlined"
        />
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
          onChange={formik.handleChange}
          type="text"
          value={formik.values.cantidad}
          variant="outlined"
        />
      </Grid>
      <Grid item md={12} xs={12} lg={12} sm={12} container>
        <Grid item md={12} xs={12} lg={12} sm={12}>
          <Typography variant="h5">
            {formik.values.materiales.length} Materiales(s)
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
                <TableCell align="left" width="30%">
                  Instrucciones
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {formik.values.materiales.map(({ noLinea: index }) => {
                return (
                  <TableRow key={index}>
                    <TableCell
                      variant="body"
                      padding="checkbox"
                      align="center"
                      size="small"
                    >
                      <Typography>
                        {formik.values.materiales[index].noLinea + 1}
                      </Typography>
                    </TableCell>
                    <TableCell variant="body" size="small">
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={Boolean(
                          formik.touched.materiales?.[index]?.productoID &&
                            formik.errors.materiales?.[index]?.productoID
                        )}
                      >
                        <InputLabel id="productoID">Material</InputLabel>
                        <Select
                          labelId="productoID"
                          size="small"
                          id="productoID-select"
                          name={`materiales[${index}].productoID`}
                          value={formik.values.materiales[index].productoID}
                          label="Material"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          renderValue={(selected) => {
                            const { descripcion } = materiales.find(
                              (s) => s.id === selected
                            ) || {
                              descripcion: "Selecciona un Material",
                            };
                            return descripcion;
                          }}
                        >
                          <MenuItem value="-1">Selecciona un Material</MenuItem>
                          {materiales.map((producto) => (
                            <MenuItem key={producto.id} value={producto.id}>
                              {producto.descripcion}
                            </MenuItem>
                          ))}
                        </Select>
                        {Boolean(
                          formik.touched.materiales?.[index]?.productoID &&
                            formik.errors.materiales?.[index]?.productoID
                        ) && (
                          <FormHelperText>
                            {formik.errors.materiales?.[0]?.productoID}
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
                        name={`materiales[${index}].cantidad`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.materiales[index].cantidad}
                        variant="outlined"
                        error={Boolean(
                          formik.touched.materiales?.[index]?.cantidad &&
                            formik.errors.materiales?.[index]?.cantidad
                        )}
                        helperText={
                          formik.touched.materiales?.[index]?.cantidad &&
                          formik.errors.materiales?.[0]?.cantidad
                        }
                      />
                    </TableCell>
                    <TableCell variant="body" size="small" align="center">
                      <TextField
                        fullWidth
                        size="small"
                        label="Instrucciones"
                        margin="normal"
                        name={`materiales[${index}].instrucciones`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.materiales[index].instrucciones}
                        variant="outlined"
                        error={Boolean(
                          formik.touched.materiales?.[index]?.instrucciones &&
                            formik.errors.materiales?.[index]?.instrucciones
                        )}
                        helperText={
                          formik.touched.materiales?.[index]?.instrucciones &&
                          formik.errors.materiales?.[0]?.instrucciones
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
                    {formik.values.materiales.reduce(
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
