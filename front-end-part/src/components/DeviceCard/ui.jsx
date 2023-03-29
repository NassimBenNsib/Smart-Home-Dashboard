import React from "react";
import "./style.css";

function DeviceCardUI({
  status,
  icon,
  device,
  onChangeState,
  color1,
  color2 = color1,
}) {
  return (
    <div
      className="DeviceCard"
      is-active={status ? "true" : "false"}
      style={{ "--color1": color1, "--color2": color2 }}
    >
      <div className="status">
        <div className="status">{status ? "ON" : "OFF"}</div>
        <div
          className="button"
          onClick={() => {
            onChangeState(device);
          }}
        >
          <div className="circle"></div>
        </div>
      </div>
      <img src={icon} width="40px" alt={`device-${device}-icon`} />
      <div className="title">{device}</div>
    </div>
  );
}

export default DeviceCardUI;
