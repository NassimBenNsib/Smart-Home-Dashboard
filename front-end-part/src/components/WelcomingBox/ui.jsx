import React from "react";
import * as assets from "../../assets";
import "./style.css";

function WelcomingBoxUI({ user, quote, weather, onUpdate }) {
  return (
    <div className="WelcomingBox shadow">
      <h1>Hello {user} !</h1>
      <p className="quote-container">
        <strong>Quotes of the Day :</strong>{" "}
        <span className="quote">{quote.quote}</span>
        <br />
        <br />
        <em> --{quote.who}--</em>
      </p>

      <div className="weather-container">
        <p title="Click to get new update" onClick={onUpdate}>
          {weather > 0 ? "+" + weather : "-" + Math.abs(weather)}
          <sup>°</sup>C
        </p>
        <img src={assets.CloudIcon} alt="cloud-icon" />
        <div id="openweathermap-widget-11" className="weather-widget"></div>
      </div>
      <p className="info">Outdoor temperature</p>
    </div>
  );
}

export default WelcomingBoxUI;
