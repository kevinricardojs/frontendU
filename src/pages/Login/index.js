import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
} from "@mui/material";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../assets/img/logo.png";
import { iniciarSesion } from "../../slices/sesionSlice";
import apiClient from "../../servicios/ClienteHttp";

export const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    sucursalID: "",
  });

  const [sucursales, setSucursales] = useState([]);
  const { loading } = useSelector((state) => state.sesion);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendData(form);
  };

  const [loadingSucursales, setLoadingSucursales] = useState(false);

  const getSucursal = async () => {
    setLoadingSucursales(true);
    try {
      const response = await apiClient.get(
        `/autenticacion/sucursales?email=${form.email}`
      );
      setSucursales(response.data);
    } catch (e) {}
    setLoadingSucursales(false);
  };

  const sendData = (form) => {
    const sucursal = sucursales.find((s) => s.id === form.sucursalID);
    dispatch(
      iniciarSesion({
        email: form.email,
        password: form.password,
        sucursal: sucursal,
      })
    );
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const [loginButton, setLoginButton] = useState(false);
  useEffect(() => {
    if (form.email !== "" && form.password !== "" && form.sucursalID !== "") {
      setLoginButton(true);
    }
  }, [form]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          height="600px"
          width="400px"
          padding="20px"
          marginTop="5%"
          boxShadow={3}
        >
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Grid item md={12} xs={12} lg={12} sm={12}>
              <img
                src={Logo}
                alt="logo"
                style={{ width: "200px", height: "200px" }}
              />
            </Grid>
            <Grid item md={12} xs={12} lg={12} sm={12}>
              <FormControl margin="normal" fullWidth variant="standard">
                <InputLabel id="email-login">Email</InputLabel>
                <Input
                  id="email-login"
                  type="text"
                  placeholder="Ingresa tu email"
                  endAdornment={
                    <InputAdornment position="start">
                      <AccountBoxOutlinedIcon />
                    </InputAdornment>
                  }
                  name="email"
                  value={form.email}
                  onBlur={getSucursal}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="off"
                />
              </FormControl>
              <FormControl margin="normal" fullWidth variant="standard">
                <InputLabel id="password-login">Contraseña</InputLabel>
                <Input
                  id="password-login"
                  type="password"
                  placeholder="Contraseña"
                  endAdornment={
                    <InputAdornment position="start">
                      <LockOpenIcon />
                    </InputAdornment>
                  }
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="off"
                />
              </FormControl>
              <FormControl fullWidth margin="normal" variant="standard">
                <InputLabel id="surcursalID">Sucursal</InputLabel>
                <Select
                  disabled={sucursales.length === 0}
                  labelId="surcursalID"
                  id="surcursalID-select"
                  name="sucursalID"
                  value={form.sucursalID}
                  label="Sucursal"
                  onChange={handleChange}
                  renderValue={(selected) => {
                    const { descripcion } = sucursales.find(
                      (s) => s.id === selected
                    ) || { descripcion: "No se encontraron sucursales" };
                    return descripcion.substring(0, 20) + "...";
                  }}
                >
                  {sucursales.map((sucursal) => (
                    <MenuItem key={sucursal.id} value={sucursal.id}>
                      {sucursal.descripcion}
                    </MenuItem>
                  ))}
                </Select>
                {loadingSucursales && <LinearProgress />}
              </FormControl>
            </Grid>

            <Grid item md={12} xs={12} lg={12} sm={12}>
              <FormControl>
                <br />
                <Button
                  color="primary"
                  variant="outlined"
                  type="submit"
                  disabled={!loginButton}
                >
                  Iniciar Sesión
                </Button>
              </FormControl>
            </Grid>
            <Grid item>{loading && <CircularProgress />}</Grid>
          </Grid>
        </Box>
      </Grid>
    </form>
  );
};
