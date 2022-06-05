import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClienteHttp from "../servicios/ClienteHttp";

export const fetchList = createAsyncThunk(
  "ventas/fetchList",
  async (args, { dispatch }) => {
    await ClienteHttp.get("/ventas").then((response) => {
      dispatch(setList(response.data));
    });
  }
);
export const ventasSlice = createSlice({
  name: "ventas",
  initialState: {
    loading: true,
    list: [],
  },
  reducers: {
    setList: (state, { payload }) => {
      state.list = payload;
      state.loading = false;
    },
    add: (state, { payload }) => {
      const list = [...state.list, payload];
      state.list = list;
    },
    update: (state, { payload }) => {
      const data = state.list.map((e) => {
        if (e.id !== payload.id) {
          return e;
        } else {
          return payload;
        }
      });
      state.list = data;
    },
  },
});
export const { setList, add, update } = ventasSlice.actions;
export default ventasSlice.reducer;
