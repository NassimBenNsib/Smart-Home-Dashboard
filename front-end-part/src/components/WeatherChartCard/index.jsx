import { useState, useEffect } from "react";
import UI from "./ui";
import { request } from "../../utilities";
import { weather_apis_urls } from "../../configuration";
import { format_weather_data } from "../../helps";

function WeatherChartCard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    request({
      callback: ({ data }) => {
        setData(format_weather_data(data));
      },
      method: "get",
      url: weather_apis_urls.statistics,
      title: " Getting weather statistics",
      withNotification: false,
    });
  }, []);

  return (
    <UI
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Chart about weather",
            size: "30px",
          },
        },
      }}
      data={data}
      onUpdate={() => {
        request({
          callback: ({ data }) => {
            setData(format_weather_data(data));
          },
          method: "get",
          url: weather_apis_urls.statistics,
          title: " Getting weather statistics",
          withNotification: false,
        });
      }}
    />
  );
}

export default WeatherChartCard;
