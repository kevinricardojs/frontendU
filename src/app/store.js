import { configureStore } from "@reduxjs/toolkit";
import snackReducer from "../slices/snackSlice";
import sesionReducer from "../slices/sesionSlice";
import usuarioReducer from "../slices/usuarioSlice";
import loadingGlobalReducer from "../slices/loadingGlobal";
import empresaReducer from "../slices/configuraciones/empresasSlice";
import sucursalReducer from "../slices/configuraciones/sucursalesSlice";
import socioNegocioReducer from "../slices/configuraciones/socioNegociosSlice";

export const store = configureStore({
  reducer: {
    snack: snackReducer,
    sesion: sesionReducer,
    usuario: usuarioReducer,
    loadingGlobal: loadingGlobalReducer,
    empresa: empresaReducer,
    sucursal: sucursalReducer,
    socioNegocio: socioNegocioReducer,
  },
});
