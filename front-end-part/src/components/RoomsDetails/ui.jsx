import React from "react";
import { FeatureCard } from "..";
import * as assets from "../../assets";
import "./style.css";

function RoomsDetailsUI({
  selectedRoom,
  rooms,
  features,
  onChangeSelectedRoom,
  temperature,
  humidity,
}) {
  return (
    <div className="RoomsDetails">
      <div className="header">
        <div className="label">Measuring : </div>
        <div className="temperature measure">
          <img src={assets.Temperature2Icon} alt="temperature-icon" />
          {temperature}
          <sup>°</sup>C
        </div>
        <div className="humidity measure">
          <img src={assets.HumidityIcon} alt="humidity-icon" />
          {humidity}%
        </div>
      </div>
      <div className="rooms">
        {rooms.map((room) => {
          return (
            <div
              key={room}
              className="room"
              is-selected={selectedRoom === room ? "true" : "false"}
              onClick={() => {
                onChangeSelectedRoom(room);
              }}
            >
              {room}
            </div>
          );
        })}
      </div>
      <div className="features">
        {features.map((feature) => {
          return <FeatureCard key={feature} feature={feature} />;
        })}
      </div>
    </div>
  );
}

export default RoomsDetailsUI;
