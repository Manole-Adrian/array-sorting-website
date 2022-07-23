import "./Header.css";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import React, { useEffect } from "react";
import RangeSlider from 'react-bootstrap-range-slider';

export default function Header(props) {
  const [animate,setAnimate] = React.useState('')
  return (
    <div className={`header ${animate}`}>
      <div className="nameContainer">
        <h3 className="nameTitle">Array Sorting Visualiser</h3>
        <p className="nameSubtitle">By Manole Adrian</p>
      </div>
      <div className={`sortDropdown ${props.sortMethod === 'choose' ? 'pulsating' : ''}`}>
        <DropdownButton
          id="dropdown-basic-button"
          title={props.sortMethod === 'choose' ? "Choose!" : props.sortMethod[0].toUpperCase()+props.sortMethod.substring(1)}
          variant="green"
          value='choose'
          onSelect={props.handleSortChange}
          className="custom-dropdown"
        >
          <Dropdown.Item eventKey="choose">
            Choose!
          </Dropdown.Item>
          <Dropdown.Item eventKey="bubble">
            Bubble Sort
          </Dropdown.Item>
          <Dropdown.Item eventKey="selection">
            Selection Sort
          </Dropdown.Item>
          <Dropdown.Item eventKey="insertion">
            Insertion Sort
          </Dropdown.Item>
          <Dropdown.Item eventKey="gnome">
            Gnome Sort
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="rangeSlider">
        <div className="gg-arrows-h"> </div>
        <RangeSlider
        variant="success"
        tooltip="off"
        min={10}
        max={100}
        step={2}
        size="sm"
        onChange={props.handleLengthChange} />
      </div>

      <div className="rangeSlider">
        <div className="gg-alarm"> </div>
        <RangeSlider
        variant="success"
        tooltip="off"
        min={5}
        max={195}
        step={10}
        size="sm"
        onChange={props.handleSpeedChange}
        />

      </div>
    </div>
  );
}
