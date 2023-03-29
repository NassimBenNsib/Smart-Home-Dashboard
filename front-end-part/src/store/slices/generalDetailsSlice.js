import { createSlice } from "@reduxjs/toolkit";
import { quotes } from "../../data";
import { faker } from "@faker-js/faker";

const initialState = {
  user: "user",
  weather: 0,
  quote: quotes[faker.datatype.number({ min: 0, max: quotes.length - 1 })],
};

const generalInfoSlice = createSlice({
  name: "generalInfo",
  initialState,
  reducers: {
    changeWeather: (state, action) => {
      state.weather = action.payload;
    },
    changeUser: (state, action) => {
      state.user = action.payload;
    },
    changeQuote: (state, action) => {
      state.quote = { ...action.payload };
    },
  },
});

const slice = {
  reducer: generalInfoSlice.reducer,
  actions: generalInfoSlice.actions,
};

export default slice;
