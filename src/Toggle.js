import "./switch.styles.css";
import * as React from "react";

class Switch extends React.Component {
  // when the checkout box is clicked, it will call the function we pass it
  // and this function will change its value
  render() {
    const { on, onClick, ...props } = this.props;
    console.log('on is', on);
    const btnClassName = ["toggle-btn", on ? "toggle-btn-on" : "toggle-btn-off"]
      .filter(Boolean)
      .join(" ");
    return (
      <label aria-label="openOrNot" style={{ display: "block" }}>
        <input
          className="toggle-input"
          type="checkbox"
          checked={on}
          onChange={()=>{}}
          onClick={onClick}
          role="switch"
          aria-checked={on}
        />
        <span className={btnClassName} {...props} />
      </label>
    );
  }
}

export { Switch };
