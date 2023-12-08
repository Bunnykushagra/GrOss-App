import React from "react";
import './Button.css';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];

const SIZES = ['btn--medium', 'btn--large'];

function Button(props){
    const checkButtonStyle = STYLES.includes(props.buttonStyle)
    ? props.buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(props.buttonSize) ? props.buttonSize : SIZES[0];

  function handleClick(event){
    props.onStart();
  }

  return (
    <>
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={handleClick}
      type={props.type}
    >
      {props.children}
    </button>
  </>
);
}

export default Button;