import React from "react";
import "../Button/Button.css";
import { Link } from "react-router-dom";

//  This component is a Button to reuse in the project

export function Button(props) {
  const mystyle = {
    height: props.height,
    width: props.width,
  };
  return (
    <Link to={props.link}>
      <button
        className="btn"
        style={mystyle}
        type={props.type}
        from={props.from}
      >
        {props.bgtext}
        <br></br>
        <p className="smtext">{props.smtext}</p>
      </button>
    </Link>
  );
}
