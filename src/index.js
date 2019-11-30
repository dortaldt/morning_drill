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
              if (switchState === "on") {
                setSwitchState("off");
                props.modify(props.switchId, 'off')
              }
              else {
                setSwitchState("on");
                props.modify(props.switchId, 'on')
              }
            }}
          >
            {props.emoji}
          </button>
        </div>
      </div>
    </div>
  );
}

function Sun(props){
  return (
    <div className='sun'>

    </div>
  )
}

function List(props) {

  const items = ["💩", "👖", "👕", "😬","test"];

  const [switchsState, setSwitchState] = useState(Array(items.length).fill('off'))

// Setting the background acourding to the switches
  const ons = switchsState.map(x =>(x == 'on'))
  const background = (ons.filter(Boolean).length/items.length*100).toFixed(1)
  const bgStyle = {
    'background-image' : 'linear-gradient(135deg, #5bb0ff 0%, #0070fb ' + background +'%)'  
  }

// pass the value from the switch to the list
  const modify = (i,val) => {
    const switchs = switchsState.slice();
    switchs[i] = val;
    setSwitchState(switchs)
  }

  console.log(switchsState)
  return (
    <div className='list-container' style ={bgStyle}>
      <div className="list" >
        {items.map((item,i) => (
          <Toggle emoji={item} onOff ={switchsState[i]} modify={modify} switchId = {i}/>
        ))}
        {/* <Sun /> */}
      </div>
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
