import { useState, useEffect } from "react";
import UI from "./ui";
import { request } from "../../utilities";
import { apis_base_url } from "../../configuration";
import { format_measured_data } from "../../helps";
import { useSelector } from "react-redux";

function HistoryCard() {
  const selectedRoom = useSelector((state) => state.roomsDetails.selectedRoom);
  const [historyMeasure, setHistoryMeasure] = useState({
    collections_format_1: null,
    collections_format_2: null,
  });

  useEffect(() => {
    request({
      callback: ({ data }) => {
        setHistoryMeasure(format_measured_data(data));
      },
      method: "get",
      url: apis_base_url + "/measured-values",
      title: " Getting weather statics",
      withNotification: false,
    });
  }, []);

  const columns = [
    {
      name: "Temperature",
      selector: (row) => row.temperature,
      sortable: true,
    },
    {
      name: "Humidity",
      selector: (row) => row.humidity,
      sortable: true,
    },
  ];

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
            text: "",
            size: "30px",
          },
        },
      }}
      data_format_1={historyMeasure.collections_format_1?.[selectedRoom]}
      data_format_2={historyMeasure.collections_format_2?.[selectedRoom]}
      columns={columns}
      onUpdate={() => {
        request({
          callback: ({ data }) => {
            setHistoryMeasure(format_measured_data(data));
          },
          method: "get",
          url: apis_base_url + "/measured-values",
          title: " Getting weather statics",
          withNotification: false,
        });
      }}
    />
  );
}

export default HistoryCard;
