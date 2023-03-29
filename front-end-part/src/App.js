import {
  WelcomingBox,
  RoomsDetails,
  MeasuringCard,
  DeviceCard,
  WeatherChartCard,
  HistoryCard,
} from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { colors, devices } from "./data";
import { useEffect, useCallback, useState } from "react";
import { devicesDetailsSlice, roomsDetailsSlice } from "./store";
import { request } from "./utilities";
import { apis_base_url } from "./configuration";
import { useDispatch } from "react-redux";
import Game from "./components/Game";
import alanBtn from "@alan-ai/alan-sdk-web";

function App() {
  const dispatcher = useDispatch();
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const update_house_details = useCallback(() => {
    request({
      callback: ({ data: { devicesDetails, roomsDetails } }) => {
        dispatcher(
          devicesDetailsSlice.actions.changeStateDevices(devicesDetails)
        );
        dispatcher(roomsDetailsSlice.actions.changeStateRooms(roomsDetails));
      },
      method: "get",
      url: apis_base_url + "/house-details",
      title: " Getting house updates",
      withNotification: false,
    });
  }, [dispatcher]);

  useEffect(() => {
    update_house_details();

    const ourInterval = setInterval(() => {
      setIsOnline(navigator.onLine);
      update_house_details();
    }, 2000);
    return () => {
      clearInterval(ourInterval);
    };
  }, [update_house_details]);

  useEffect(() => {
    alanBtn({
      key: "b2fc05de0e869de903cc7ca4968d80922e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "go:back") {
          // Call the client code that will react to the received command
        }
      },
    });
  }, []);

  return (
    <>
      <div className="game-container" is-offline={isOnline ? "false" : "true"}>
        <br />
        <br />
        <Game />
      </div>
      <div className="App" is-online={!isOnline ? "false" : "true"}>
        <section className="left-container">
          <WelcomingBox />
          <RoomsDetails />
          <MeasuringCard />
        </section>
        <section className="right-container">
          <div className="charts">
            <HistoryCard />
          </div>
          <div className="devices">
            {devices.map((device, index) => {
              return (
                <DeviceCard
                  key={device}
                  device={device}
                  color1={colors.devices_colors[index].color1}
                  color2={colors.devices_colors[index].color2}
                />
              );
            })}
          </div>
        </section>
        <WeatherChartCard />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
