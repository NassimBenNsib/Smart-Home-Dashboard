import { colors } from "../data";

const format_weather_data = (data) => {
  return {
    labels: data["hourly"]["time"].slice(20),
    datasets: [
      ["Temperature", "temperature_2m"],
      ["Humidity", "relativehumidity_2m"],
      ["Wind Speed", "windspeed_10m"],
      ["Rain", "rain"],
      ["Cloud", "cloudcover"],
    ].map((twins, index) => {
      return {
        label: twins[0],
        data: data["hourly"][twins[1]].slice(20),
        borderColor: colors.chart_colors[index].borderColor,
        backgroundColor: colors.chart_colors[index].backgroundColor,
      };
    }),
  };
};

export default format_weather_data;
