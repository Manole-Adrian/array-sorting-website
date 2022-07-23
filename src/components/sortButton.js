import React from "react";
import "./sortButton.css";

export default function sortButton(props) {
  return (
    <div>
        <div className={props.isSorting ? "refreshDisabled" : "refreshButton"} onClick={props.refresh}>
            <div className="refresh-icon"></div>
        </div>
      <div className="sortButton" onClick={props.sortFunc}>
        {!props.isSorting && <div className="play-icon"></div>}
        {props.isSorting && <div className="stop-icon"></div>}
      </div>
    </div>
  );
}
