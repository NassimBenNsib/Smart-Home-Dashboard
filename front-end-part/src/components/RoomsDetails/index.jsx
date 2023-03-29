import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { roomsDetailsSlice } from "../../store";
import UI from "./ui";

function RoomsDetails() {
  const roomsDetails = useSelector((state) => state.roomsDetails);
  const dispatcher = useDispatch();
  const selectedRoomDetails =
    roomsDetails.roomsFeaturesDetails[roomsDetails.selectedRoom];

  return (
    <UI
      rooms={roomsDetails.rooms}
      features={roomsDetails.features}
      selectedRoom={roomsDetails.selectedRoom}
      humidity={selectedRoomDetails["Measured Humidity"]}
      temperature={
        selectedRoomDetails.isTemperatureActive ||
        selectedRoomDetails["isAir ConditionerActive"]
          ? selectedRoomDetails["Device Temperature"]
          : selectedRoomDetails["Measured Temperature"]
      }
      featuresState={selectedRoomDetails}
      onChangeSelectedRoom={(selectedRoom) => {
        dispatcher(roomsDetailsSlice.actions.changeSelectedRoom(selectedRoom));
      }}
    />
  );
}

export default RoomsDetails;
