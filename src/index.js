import React, { useState } from "react";
import ReactDOM from "react-dom";

function Toggle(props) {

  const [switchState, setSwitch] = useState("off");

  return (
    <div className="switch-wrapper">
      <div className={"switch switch-" + switchState}>
        <div className={"circle " + switchState}>
          <button
            className={switchState}
            onClick={() => {
              if (switchState === "on") setSwitch("off");
              else setSwitch("on");
            }}
          >
            {props.emoji}
          </button>
        </div>
      </div>
    </div>
  );
}

function List(props) {
  const items = ["💩", "👖", "👕"];
  return (
    <div class="list">
      {items.map((item, i) => (
        <Toggle emoji={item} />
      ))}
    </div>
  );
}

function App(props) {

  const [switchStatus, setSwitchStatus] = useState(Array(9))
  console.log(switchStatus)

  return (
    <div className={"app"}>
      <List />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
