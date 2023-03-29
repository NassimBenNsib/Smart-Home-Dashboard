import { Line } from "react-chartjs-2";
import "./style.css";

function WeatherChartCardUI({ options, data, onUpdate }) {
  return (
    <>
      <h1>Weather chart</h1>
      {data && <Line options={options} data={data} redraw={true} />}
      <div className="update-weather-statistics-container">
        <button onClick={onUpdate}>Update</button>
      </div>
    </>
  );
}

export default WeatherChartCardUI;
