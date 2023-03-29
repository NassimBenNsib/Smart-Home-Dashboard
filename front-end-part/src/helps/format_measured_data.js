import { colors, rooms } from "../data";

const format_measured_data = (data) => {
  const collections_format_1 = {};
  const collections_format_2 = {};
  rooms.forEach((room) => {
    collections_format_1[room] = {
      labels: [],
      datasets: [
        {
          label: "Temperature",
          data: [],
          borderColor: colors.chart_colors[0].borderColor,
          backgroundColor: colors.chart_colors[0].backgroundColor,
        },
        {
          label: "Humidity",
          data: [],
          borderColor: colors.chart_colors[1].borderColor,
          backgroundColor: colors.chart_colors[1].backgroundColor,
        },
      ],
    };
    collections_format_2[room] = [];
  });
  data.forEach((row) => {
    collections_format_1[row["room"]]["labels"].push(row["date"]);
    collections_format_1[row["room"]]["datasets"][0]["data"].push(
      row["temperature"]
    );
    collections_format_1[row["room"]]["datasets"][1]["data"].push(
      row["humidity"]
    );
    collections_format_2[row["room"]].push(row);
  });

  return { collections_format_1, collections_format_2 };
};

export default format_measured_data;
