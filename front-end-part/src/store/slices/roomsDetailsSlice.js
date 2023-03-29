import { createSlice } from "@reduxjs/toolkit";
import { rooms, features } from "../../data";

const initialState = {
  rooms,
  features,
  selectedRoom: rooms?.[0],
  roomsFeaturesDetails: (() => {
    const result = {};
    const featuresValues = {};
    features.forEach((feature) => {
      featuresValues[`is${feature}Active`] = false;
    });

    rooms.forEach((room) => {
      result[room] = {
        Room: room,
        ...featuresValues,
        "Device Temperature": 0,
        "Measured Temperature": 0,
        "Measured Humidity": 0,
      };
    });
    return result;
  })(),
};

const roomsDetailsSlice = createSlice({
  name: "roomsDetails",
  initialState,

  reducers: {
    changeSelectedRoom: (state, action) => {
      state.selectedRoom = action.payload;
    },
    changeRoomMeasuredTemperature: (state, action) => {
      const selectedRoom = state.selectedRoom;
      const room = state.roomsFeaturesDetails[selectedRoom];
      room.measuredTemperature = action.payload;
    },
    changeRoomDeviceTemperature: (state, action) => {
      const selectedRoom = state.selectedRoom;
      const room = state.roomsFeaturesDetails[selectedRoom];
      if (
        (action.payload > 0 && room["Device Temperature"] < 100) ||
        (action.payload < 0 && room["Device Temperature"] > 1)
      ) {
        room.deviceTemperature += action.payload;
      }
    },
    changeStateRooms: (state, action) => {
      state.roomsFeaturesDetails = action.payload;
    },
    changeStateFeature: (state, action) => {
      const featureKey = `is${action.payload}Active`;
      const selectedRoom = state.selectedRoom;
      const room = state.roomsFeaturesDetails[selectedRoom];
      const oldState = room[featureKey];
      room[featureKey] = !oldState;

      if (oldState === false) {
        if (action.payload === "Air Conditioner") {
          room["isTemperatureActive"] = false;
        } else if (action.payload === "Temperature") {
          room["isAir ConditionerActive"] = false;
        }
      } else {
        if (
          action.payload === "Air Conditioner" ||
          action.payload === "Temperature"
        ) {
          room.calculatedTemperature = room.measuredTemperature;
        }
      }
    },
  },
});

const slice = {
  reducer: roomsDetailsSlice.reducer,
  actions: roomsDetailsSlice.actions,
};

export default slice;
