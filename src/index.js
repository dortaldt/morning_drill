import React, { useState } from "react";
import ReactDOM from "react-dom";
import { timeout } from "q";

function Success(props) {

  let spans = []
  const numSpans = 10;
  console.log(props.emoji)

  for (var i = 0; i < numSpans; i++) {
    spans.push(<span className={'single-success ' + 'anim-num-' + i + ' ' + props.runAmin}>{props.emoji}</span>);
  }

  return(
    <div className = {'success ' + props.class}>
      <div className = 'success-wrapper'>
          {spans}
      </div>
    </div>
  )
}

function Toggle(props) {

  const [switchState, setSwitchState] = useState(props.onOff)
  
  return (
    <div>
      <div className="switch-wrapper">
        <div className={"switch switch-" + switchState}>
          <div className={"circle " + switchState}>
            <button
              className={switchState + ' noselect'}
              onClick={() => {
                if (switchState === "on") {
                  setSwitchState("off");
                  props.sendSwitchState(props.switchId, 'off')
                }
                else {
                  setSwitchState("on");
                  props.sendSwitchState(props.switchId, 'on')
                  props.showAnim(props.switchId)
                }
              }}
            >
              {props.emoji}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sun(props){
  return (
    <div className='sun'>
      <div className='small'></div>
    </div>
  )
}

function List(props) {

  const items = ["💩", "👖", "👕", "😬","test"];

  const [switchsState, setSwitchState] = useState(Array(items.length).fill('off'))
  const [successOnOff, setSuccessOnOff] = useState(['off','❤️']);
  const [runAmin, setRunAnim] = useState('') 

// Setting the background acourding to the switches
  const ons = switchsState.map(x =>(x == 'on'))
  const background = (ons.filter(Boolean).length/items.length*100).toFixed(1)
  const bgStyle = {
    'background-image' : 'linear-gradient(135deg, #5bb0ff 0%, #0070fb ' + background +'%)'  
  }

// pass the value from the switch to the list
  const sendSwitchState = (i,val) => {
    const switchs = switchsState.slice();
    switchs[i] = val;
    setSwitchState(switchs)
    // Turns on and off the success icons container
  }

  const showAnim = (i) => {
    setSuccessOnOff(['on',items[i]])
    setTimeout(() => {
      setRunAnim('run-anim')
    },10)
    setTimeout(() => {
      setSuccessOnOff(['off',items[i]])
      setRunAnim('')
    }, 3000);
  }

  return (
    <div className='list-container' style ={bgStyle}>
      <div className="list" >
        <Success class={'success-' + successOnOff[0]} emoji={successOnOff[1]} runAmin={runAmin}/>
        {items.map((item,i) => (
          <Toggle emoji={item} onOff ={switchsState[i]} sendSwitchState={sendSwitchState} switchId = {i} showAnim = {showAnim}/>
        ))}
        <Sun />
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
