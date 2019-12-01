import React, { useState } from "react";
import ReactDOM from "react-dom";
import { timeout } from "q";

function Success(props) {
  const start = props.start
  let spans = []
  const numSpans = 30;

  for (var i = 0; i < numSpans; i++) {
    spans.push(<span className={'single-success ' + start}>{props.emoji}</span>);
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
                  props.modify(props.switchId, 'off')
                }
                else {
                  setSwitchState("on");
                  props.modify(props.switchId, 'on')
                }
                props.modifyAnimation('start')
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

// Setting the background acourding to the switches
  const ons = switchsState.map(x =>(x == 'on'))
  const background = (ons.filter(Boolean).length/items.length*100).toFixed(1)
  const bgStyle = {
    'background-image' : 'linear-gradient(135deg, #5bb0ff 0%, #0070fb ' + background +'%)'  
  }

  const [successOnOff, setSuccessOnOff] = useState(['off','🛳']);
  const [start, setStart] = useState('')

// pass the value from the switch to the list
  const modify = (i,val) => {
    const switchs = switchsState.slice();
    switchs[i] = val;
    setSwitchState(switchs)
    // Set the success animation and then turn it off
    setSuccessOnOff([val,items[i]])

    setTimeout(function(){
      setSuccessOnOff(['off',items[i]])
      setStart('')
    },3000);
  }

  const modifyAnimation = () => {
    setTimeout(function(){
      setStart('start')
    }, 100)
  }

  return (
    <div className='list-container' style ={bgStyle}>
      <div className="list" >
        <Success class={'success-' + successOnOff[0]} emoji={successOnOff[1]}  start={start}/>
        {items.map((item,i) => (
          <Toggle emoji={item} onOff ={switchsState[i]} modify={modify} switchId = {i} modifyAnimation={modifyAnimation}/>
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
