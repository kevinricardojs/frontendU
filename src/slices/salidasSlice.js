import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ClienteHttp from "../servicios/ClienteHttp";

export const fetchList = createAsyncThunk(
  "salidas/fetchList",
  async (args, { dispatch }) => {
    await ClienteHttp.get("/salidas").then((response) => {
      dispatch(setList(response.data));
    });
  }
);
export const salidasSlice = createSlice({
  name: "salidas",
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
export const { setList, add, update } = salidasSlice.actions;
export default salidasSlice.reducer;
