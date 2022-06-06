import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClienteHttp from "../servicios/ClienteHttp";

export const fetchUsuarioData = createAsyncThunk(
  "usuario/fetchUsuarioData",
  async (args, { dispatch }) => {
    await ClienteHttp.get("/usuario").then((response) => {
      dispatch(setUser(response.data));
    });
  }
);

export const usuarioSlice = createSlice({
  name: "usuario",
  initialState: {
    logged: false,
    usuario: {
      nombres: "",
      apellidos: "",
      userName: "",
      email: "",
      sucursal: "",
    },
    permisos: [],
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.usuario = payload;
    },
    setLogged: (state) => {
      state.logged = true;
    },
    setUnLogged: (state) => {
      state.logged = false;
    },
  },
});

export const { setUser, setLogged, setUnLogged } = usuarioSlice.actions;
export default usuarioSlice.reducer;
