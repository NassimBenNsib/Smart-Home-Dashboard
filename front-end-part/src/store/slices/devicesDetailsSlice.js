import { createSlice } from "@reduxjs/toolkit";
import { devices } from "../../data";

const initialState = {
  devices,
  devicesDetails: (() => {
    const result = {};
    devices.forEach((devices) => {
      result[`is${devices}Active`] = false;
    });

    return result;
  })(),
};

const devicesDetailsSlice = createSlice({
  name: "roomsDetails",
  initialState,

  reducers: {
    changeStateDevice: (state, action) => {
      const deviceKey = `is${action.payload}Active`;
      const oldState = state.devicesDetails[deviceKey];
      state.devicesDetails[deviceKey] = !oldState;
    },
    changeStateDevices: (state, action) => {
      state.devicesDetails = action.payload;
    },
  },
});

const slice = {
  reducer: devicesDetailsSlice.reducer,
  actions: devicesDetailsSlice.actions,
};

export default slice;
