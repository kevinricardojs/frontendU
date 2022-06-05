import { configureStore } from "@reduxjs/toolkit";
import snackReducer from "../slices/snackSlice";
import sesionReducer from "../slices/sesionSlice";
import usuarioReducer from "../slices/usuarioSlice";
import loadingGlobalReducer from "../slices/loadingGlobal";
import empresaReducer from "../slices/configuraciones/empresasSlice";
import sucursalReducer from "../slices/configuraciones/sucursalesSlice";
import socioNegocioReducer from "../slices/configuraciones/socioNegociosSlice";
import familiaProductoReducer from "../slices/productos/familiaProductosSlice";
import tipoProductoReducer from "../slices/productos/tipoProductosSlice";
import productoReducer from "../slices/productos/productosSlice";
import cuentaReducer from "../slices/presupuesto/cuentasSlice";
import compraReducer from "../slices/comprasSlice";
import ventaReducer from "../slices/ventasSlice";

export const store = configureStore({
  reducer: {
    snack: snackReducer,
    sesion: sesionReducer,
    usuario: usuarioReducer,
    loadingGlobal: loadingGlobalReducer,
    empresa: empresaReducer,
    sucursal: sucursalReducer,
    socioNegocio: socioNegocioReducer,
    familiaProducto: familiaProductoReducer,
    tipoProducto: tipoProductoReducer,
    producto: productoReducer,
    cuenta: cuentaReducer,
    compra: compraReducer,
    venta: ventaReducer,
  },
});
