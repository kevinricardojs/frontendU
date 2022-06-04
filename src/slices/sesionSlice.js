import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ClienteHttp from "../servicios/ClienteHttp";
import { loaderGlobalApagado, loaderGlobalEncendido } from "./loadingGlobal";
import { showError } from "./snackSlice";
import { setLogged, setUnLogged, setUser } from "./usuarioSlice";

export const iniciarSesion = createAsyncThunk(
  "sesion/login",
  async (user, { dispatch }) => {
    try {
      const json = JSON.stringify({
        email: user.email,
        password: user.password,
        sucursalID: user.sucursal.id,
      });

      await ClienteHttp.post("/autenticacion/Login", json).then((response) => {
        if (response.status === 200) {
          window.localStorage.setItem("token", response.data.token);
          dispatch(setToken(response.data));
          dispatch(setLogged());
          const [sucursal, empresa] = user.sucursal.descripcion.split(" - ");
          dispatch(
            setUser({
              ...response.data.user,
              sucursal: sucursal,
              empresa: empresa,
            })
          );
        }
      });
    } catch (err) {
      const texto = err.response.data.error;
      dispatch(showError(texto));
    }
  }
);

export const validarTokenActual = createAsyncThunk(
  "sesion/validarTokenActual",
  async (token, { dispatch }) => {
    dispatch(loaderGlobalEncendido());
    if (token) {
      try {
        await ClienteHttp.post("/autenticacion/validarToken", { token }).then(
          (response) => {
            if (response.status === 200) {
              console.log(response.data);
              window.localStorage.setItem("token", response.data.token);
              dispatch(setToken(response.data));
              dispatch(setUser(response.data.user));
            }
            dispatch(loaderGlobalApagado());
            dispatch(setLogged());
          }
        );
      } catch (err) {
        dispatch(deleteToken());
        const texto = err.response.data.error;
        dispatch(showError(texto));
        dispatch(setUnLogged());
      }
      dispatch(loaderGlobalApagado());
    }
    dispatch(loaderGlobalApagado());
  }
);

export const sesionSlice = createSlice({
  name: "sesion",
  initialState: {
    loading: false,
    token: null,
  },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload.token;
    },
    deleteToken: (state) => {
      state.token = null;
      state.usuario = null;
    },
  },
  extraReducers: {
    [iniciarSesion.fulfilled]: (state) => {
      state.loading = false;
    },
    [iniciarSesion.pending]: (state) => {
      state.loading = true;
    },
    [iniciarSesion.rejected]: (state) => {
      state.loading = false;
    },
    [validarTokenActual.fulfilled]: (state) => {
      state.loading = false;
    },
    [validarTokenActual.pending]: (state) => {
      state.loading = true;
    },
    [validarTokenActual.rejected]: (state) => {
      state.loading = false;
    },
  },
});
export const { setToken, deleteToken } = sesionSlice.actions;
export default sesionSlice.reducer;
