import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { roomsDetailsSlice } from "../../store";
import * as assets from "../../assets";
import { request } from "../../utilities";
import { apis_base_url } from "../../configuration";
import UI from "./ui";

function FeatureCard({ feature }) {
  const room = useSelector(
    (state) =>
      state.roomsDetails.roomsFeaturesDetails[state.roomsDetails.selectedRoom]
  );
  const dispatcher = useDispatch();

  return (
    <UI
      status={room[`is${feature}Active`]}
      icon={assets[`${feature.replace(" ", "")}Icon`]}
      feature={feature}
      // onChangeState={(feature) => {
      //   dispatcher(roomsDetailsSlice.actions.changeStateFeature(feature));
      // }}
      onChangeState={(feature) => {
        request({
          callback: () => {
            dispatcher(roomsDetailsSlice.actions.changeStateFeature(feature));
          },
          method: "patch",
          url: apis_base_url + "/rooms-details",
          title: " Changing room details " + feature,
          withNotification: true,
          data: {
            Status: !room[`is${feature}Active`],
            Feature: `is${feature}Active`,
            Room: room["Room"],
          },
        });
      }}
    />
  );
}

export default FeatureCard;
