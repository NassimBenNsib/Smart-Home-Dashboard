import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generalDetailsSlice } from "../../store";
import { faker } from "@faker-js/faker";
import { weather_apis_urls } from "../../configuration";
import { quotes } from "../../data";
import { request } from "../../utilities";
import UI from "./ui";
import { useCallback } from "react";

function WelcomingBox() {
  const dispatcher = useDispatch();
  const generalDetails = useSelector((state) => {
    return state.generalDetails;
  });

  const update_weather = useCallback(() => {
    request({
      callback: (response) => {
        dispatcher(
          generalDetailsSlice.actions.changeWeather(
            Math.round(response.data.main.temp)
          )
        );
      },
      method: "get",
      url: weather_apis_urls.current,
      title: " Getting weather",
      withNotification: false,
    });
  }, [dispatcher]);
  useEffect(() => {
    update_weather();
    const ourInterval = setInterval(() => {
      dispatcher(
        generalDetailsSlice.actions.changeQuote(
          quotes[faker.datatype.number({ min: 0, max: quotes.length - 1 })]
        )
      );
    }, 60000);
    return () => {
      clearInterval(ourInterval);
    };
  }, [dispatcher, update_weather]);

  return (
    <UI
      weather={generalDetails.weather}
      user={generalDetails.user}
      quote={generalDetails.quote}
      onUpdate={update_weather}
    />
  );
}

export default WelcomingBox;
