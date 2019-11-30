import React, { useState } from "react";
import ReactDOM from "react-dom";

function Toggle(props) {

  const [switchState, setSwitchState] = useState(props.onOff)

  return (
    <div className="switch-wrapper">
      <div className={"switch switch-" + switchState}>
        <div className={"circle " + switchState}>
          <button
            className={switchState}
            onClick={() => {
              if (switchState === "on") setSwitchState("off");
              else setSwitchState("on");
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

  const [switchsState, setSwitchState] = useState(Array(items.length).fill('off'))
  console.log(switchsState)

  return (
    <div class="list">
      {items.map((item,i) => (
        <Toggle emoji={item} onOff ={switchsState[i]}/>
      ))}
    </div>
  );
}

function App(props) {
  return (
    <div className="app">
      <List />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
