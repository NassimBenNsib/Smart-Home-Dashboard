import { configureStore } from "@reduxjs/toolkit";
import {
  generalDetailsSlice,
  roomsDetailsSlice,
  devicesDetailsSlice,
} from "./index";

const store = configureStore({
  reducer: {
    generalDetails: generalDetailsSlice.reducer,
    roomsDetails: roomsDetailsSlice.reducer,
    devicesDetails: devicesDetailsSlice.reducer,
  },
});

export default store;
