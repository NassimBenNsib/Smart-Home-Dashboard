import React from "react";
import "./style.css";

function FeatureCardUI({ status, icon, feature, onChangeState }) {
  return (
    <div className="FeatureCard shadow" is-active={status ? "true" : "false"}>
      <div className="status">
        <div className="status">{status ? "ON" : "OFF"}</div>
        <div
          className="button"
          onClick={() => {
            onChangeState(feature);
          }}
        >
          <div className="circle"></div>
        </div>
      </div>
      <img src={icon} width="40px" alt={`feautre-${feature}-icon`} />
      <div className="title">{feature}</div>
    </div>
  );
}

export default FeatureCardUI;
