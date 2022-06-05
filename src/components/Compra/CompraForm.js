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
import { fetchList as fetchSocios } from "../../slices/configuraciones/socioNegociosSlice";
import { add, update } from "../../slices/comprasSlice";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { AddCircle, Delete } from "@mui/icons-material";

export const CompraForm = ({ modeEdit, datos }) => {
  const { list: productos } = useSelector((state) => state.producto);
  const socios = useSelector((state) =>
    state.socioNegocio.list.filter((s) => s.tipo === 0)
  );
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    socioNegocioID: Yup.number().min(0, "Debes seleccionar un proveedor"),
    facturaSerie: Yup.string()
      .required("Debes ingresar la serie de la factura")
      .min(5, "La serie de la factura tiene un minimo de 5 caracteres"),
    facturaFecha: Yup.date()
      .max(new Date(), "Escoge una fecha anterior a hoy")
      .required("Debes ingresar la fecha de la factura")
      .typeError("Debes seleccionar una fecha valida"),
    detalles: Yup.array().of(
      Yup.object().shape({
        productoID: Yup.number().min(0, "Debes seleccionar un producto"),
        precio: Yup.number().min(0.01, "El precio debe ser mayor a cero"),
        cantidad: Yup.number().min(0.01, "La cantidad debe ser mayor a cero"),
        descripcion: Yup.string(),
      })
    ),
  });
  const initialValues = {
    facturaSerie: "",
    facturaFecha: "",
    socioNegocioID: "-1",
    detalles: [
      {
        productoID: -1,
        noLinea: 0,
        precio: 0,
        cantidad: 0,
        descripcion: "",
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

          const { data } = await apiClient.post(`/compras`, json);
          dispatch(showSuccess(`Compra #${data.id} Creada`));
          dispatch(add(data));
          formik.resetForm();
        } catch (e) {
          dispatch(showError("Error al crear el Compra"));
        }
      } else {
        try {
          const json = JSON.stringify({ ...values });

          await apiClient.put(`/compras/${datos.id}`, json);
          dispatch(update({ ...values }));
          dispatch(showSuccess(`Compra actualizada`));
        } catch (e) {
          dispatch(showError("Error al actualizar el Compra"));
        }
      }
    },
  });
  const addBlankDetalle = () => {
    const newDetalles = [
      ...formik.values.detalles,
      {
        productoID: -1,
        noLinea: formik.values.detalles.length,
        precio: 0,
        cantidad: 0,
        descripcion: "",
      },
    ];
    formik.setFieldValue("detalles", newDetalles);
  };

  const deleteDetalle = (noLinea) => {
    const newDetalles = formik.values.detalles
      .filter((d) => d.noLinea !== noLinea)
      .map((d, index) => ({ ...d, noLinea: index }));
    formik.setFieldValue("detalles", newDetalles);
  };
  useEffect(() => {
    dispatch(fetchProductos());
    dispatch(fetchSocios());
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
          {modeEdit ? "Editar" : "Crea"} una Compra
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <FormControl
          fullWidth
          margin="normal"
          error={Boolean(
            formik.touched.socioNegocioID && formik.errors.socioNegocioID
          )}
        >
          <InputLabel id="socioNegocioID">Proveedor</InputLabel>
          <Select
            labelId="socioNegocioID"
            id="socioNegocioID-select"
            name="socioNegocioID"
            value={formik.values.socioNegocioID}
            label="Proveedor"
            onChange={formik.handleChange}
            renderValue={(selected) => {
              const { nombre } = socios.find((s) => s.id === selected) || {
                nombre: "Selecciona un proveedor",
              };
              return nombre;
            }}
          >
            <MenuItem value="-1">Selecciona un proveedor</MenuItem>
            {socios.map((socio) => (
              <MenuItem key={socio.id} value={socio.id}>
                {socio.nombre}
              </MenuItem>
            ))}
          </Select>
          {Boolean(
            formik.touched.socioNegocioID && formik.errors.socioNegocioID
          ) && <FormHelperText>{formik.errors.socioNegocioID}</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <TextField
          error={Boolean(
            formik.touched.facturaSerie && formik.errors.facturaSerie
          )}
          fullWidth
          helperText={formik.touched.facturaSerie && formik.errors.facturaSerie}
          label="Serie de Factura"
          margin="normal"
          placeholder="Ingresa el serie"
          name="facturaSerie"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          type="text"
          value={formik.values.facturaSerie}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fecha de factura de proveedor"
            inputVariant="outlined"
            value={formik.values.facturaFecha}
            onChange={(newDate) => {
              formik.setFieldValue("facturaFecha", newDate);
            }}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  name="facturaFecha"
                  error={Boolean(
                    formik.touched.facturaFecha && formik.errors.facturaFecha
                  )}
                  fullWidth
                  helperText={
                    formik.touched.facturaFecha && formik.errors.facturaFecha
                  }
                  margin="normal"
                />
              );
            }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item md={12} xs={12} lg={12} sm={12} container>
        <Grid item md={12} xs={12} lg={12} sm={12}>
          <Typography variant="h5">
            {formik.values.detalles.length} Producto(s)
          </Typography>
        </Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox" variant="head" align="center">
                  No
                </TableCell>
                <TableCell width="20%">Producto</TableCell>
                <TableCell align="center">Cantidad</TableCell>
                <TableCell align="center">Precio</TableCell>
                <TableCell align="left" width="30%">
                  Descripción
                </TableCell>
                <TableCell></TableCell>
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
                        <InputLabel id="productoID">Producto</InputLabel>
                        <Select
                          labelId="productoID"
                          size="small"
                          id="productoID-select"
                          name={`detalles[${index}].productoID`}
                          value={formik.values.detalles[index].productoID}
                          label="Producto"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          renderValue={(selected) => {
                            const { descripcion } = productos.find(
                              (s) => s.id === selected
                            ) || {
                              descripcion: "Selecciona un producto",
                            };
                            return descripcion;
                          }}
                        >
                          <MenuItem value="-1">Selecciona un producto</MenuItem>
                          {productos.map((producto) => (
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
                      <TextField
                        fullWidth
                        size="small"
                        label="Precio"
                        margin="normal"
                        placeholder="precio"
                        name={`detalles[${index}].precio`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="number"
                        value={formik.values.detalles[index].precio}
                        variant="outlined"
                        error={Boolean(
                          formik.touched.detalles?.[index]?.precio &&
                            formik.errors.detalles?.[index]?.precio
                        )}
                        helperText={
                          formik.touched.detalles?.[index]?.precio &&
                          formik.errors.detalles?.[0]?.precio
                        }
                      />
                    </TableCell>
                    <TableCell variant="body" size="small" align="center">
                      <TextField
                        fullWidth
                        size="small"
                        label="Descripcion"
                        margin="normal"
                        name={`detalles[${index}].descripcion`}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        type="text"
                        value={formik.values.detalles[index].descripcion}
                        variant="outlined"
                        error={Boolean(
                          formik.touched.detalles?.[index]?.descripcion &&
                            formik.errors.detalles?.[index]?.descripcion
                        )}
                        helperText={
                          formik.touched.detalles?.[index]?.descripcion &&
                          formik.errors.detalles?.[0]?.descripcion
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
                <TableCell variant="footer" colSpan={5} align="right">
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
