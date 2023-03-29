import React from "react";
import "./style.css";

function MeasuringCardUI({
  value,
  unit,
  icon,
  title,
  shortUnit,
  onChangeValue,
  isActive,
}) {
  return (
    <div
      className="MeasuringCard shadow"
      is-active={isActive ? "true" : "false"}
    >
      <div className="header">
        <img src={icon} alt={title + "icon"} />
        <span className="title">{title}</span>
      </div>
      <div className="meter-container">
        <button
          className="minus-button"
          onClick={() => {
            onChangeValue(-1);
          }}
          onDoubleClick={() => {
            onChangeValue(-4);
          }}
          disabled={!isActive}
        >
          -
        </button>
        <div className="meter">
          <div className="value">{value + shortUnit}</div>
          <div className="unit">{unit}</div>
          {new Array(36).fill("").map((_, index, array) => {
            return (
              <span
                className="line"
                key={index}
                style={{
                  "--background-color": "white",
                  "--transform-origin": "0.5px 135px",
                  "--top": "-60px",
                  "--rotation": index,
                  "--number": array.length,
                }}
              ></span>
            );
          })}
          {new Array(parseInt((value / 100) * 2000))
            .fill("")
            .map((_, index) => {
              return (
                <span
                  className="line gradient"
                  key={index}
                  style={{
                    "--top": "-25px",
                    height: "5px",
                    "--transform-origin": "0.5px 100px",
                    "--rotation": index,
                    "--number": 2000,
                    "--background-color": `hsl(${
                      300 - (index * 360) / 2000
                    }, 100%, 51%)`,
                  }}
                ></span>
              );
            })}
        </div>
        <button
          disabled={!isActive}
          className="add-button"
          onClick={() => {
            onChangeValue(1);
          }}
          onDoubleClick={() => {
            onChangeValue(4);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default MeasuringCardUI;
