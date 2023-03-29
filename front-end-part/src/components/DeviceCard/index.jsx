import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { devicesDetailsSlice } from "../../store";
import * as assets from "../../assets";
import UI from "./ui";
import { request } from "../../utilities";
import { apis_base_url } from "../../configuration";

function DeviceCard({ device, color1, color2 = color1 }) {
  const devicesDetails = useSelector((state) => {
    return state.devicesDetails.devicesDetails;
  });
  const dispatcher = useDispatch();

  return (
    <UI
      color1={color1}
      color2={color2}
      status={devicesDetails[`is${device}Active`]}
      icon={assets[`${device.replace(" ", "").replace(" ", "")}Icon`]}
      device={device}
      onChangeState={(device) => {
        request({
          callback: () => {
            dispatcher(devicesDetailsSlice.actions.changeStateDevice(device));
          },
          method: "patch",
          url: apis_base_url + "/devices-details",
          title: " Changing device status " + device,
          withNotification: true,
          data: {
            Status: !devicesDetails[`is${device}Active`],
            Device: "is" + device + "Active",
          },
        });
      }}
    />
  );
}

export default DeviceCard;
