import { createSlice } from "@reduxjs/toolkit";

export const snackSlice = createSlice({
  name: "snack",
  initialState: {
    open: false,
    mensaje: {
      texto: "",
      tipo: "",
    },
  },
  reducers: {
    showSuccess: (state, { payload }) => {
      state.open = true;
      state.mensaje = {
        texto: payload,
        tipo: "success",
      };
    },
    close: (state) => {
      state.open = false;
      state.mensaje = "";
    },
    showError(state, { payload }) {
      state.open = true;
      state.mensaje = {
        texto: payload,
        tipo: "error",
      };
    },
  },
});

export const { showSuccess, showError, close } = snackSlice.actions;
export default snackSlice.reducer;
