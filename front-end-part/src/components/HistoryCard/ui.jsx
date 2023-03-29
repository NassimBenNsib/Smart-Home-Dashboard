import React from "react";
import "./style.css";
// import DataTable from "react-data-table-component";
import { Line } from "react-chartjs-2";

function HistoryCardUI({
  columns,
  data_format_1,
  data_format_2,
  options,
  onUpdate,
}) {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Measure chart</h1>
      {data_format_1 && (
        <Line options={options} data={data_format_1} redraw={true} />
      )}
      <div className="update-container">
        <button onClick={onUpdate}>Update</button>
      </div>
      {/* <DataTable columns={columns} data={data_format_1} /> */}
    </>
  );
}

export default HistoryCardUI;
