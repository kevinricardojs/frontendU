import { createSlice } from "@reduxjs/toolkit";

export const sesionSlice = createSlice({
  name: "loadingGlobal",
  initialState: {
    loadingGlobal: true,
  },
  reducers: {
    loaderGlobalEncendido: (state) => {
      state.loadingGlobal = true;
    },
    loaderGlobalApagado: (state) => {
      state.loadingGlobal = false;
    },
  },
});
export const {
  loaderGlobalEncendido,
  loaderGlobalApagado,
} = sesionSlice.actions;
export default sesionSlice.reducer;
