import React, { useState } from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DropDown.css";

function DropDown(props) {
  const handleItemClick = (item) => {
    props.onSelect(item);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle className={props.classNm}>
        {props.selectedItem || props.name}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {props.massive.map((p, index) => (
          <Dropdown.Item key={index} onClick={() => handleItemClick(p)}>
            {p}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropDown;
