import React, { useState } from "react";
import ReactDOM from "react-dom";
import ReactGA from 'react-ga';
import Cookies from 'universal-cookie';

ReactGA.initialize('UA-38866967-4');
// import { timeout } from "q";

const cookies = new Cookies();

function Success(props) {

  let spans = []
  const numSpans = 10;

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
  return (
    <div>
      <div className="switch-wrapper">
        <div className={"switch switch-" + props.onOff + ' ' + (props.screen == 'edit' ? 'switch-edit' : null)}>
          <div className={"circle " + props.onOff}>
            <button
              className={props.onOff + ' noselect'}
              disabled = {props.screen == 'edit' ?  'disabled' : null}
              onClick={() => {
                if (props.onOff === "on") {
                  props.sendSwitchState(props.switchId, 'off')
                }
                else {
                  props.sendSwitchState(props.switchId, 'on')
                  props.showAnim(props.switchId)
                }
              }}
            >
              {props.emoji}
            </button>
          </div>
        </div>
        {props.edit ? <div className ='remove-item'>
          <button onClick = {() => {
            props.deleteItem(props.switchId)
            }} >
          <i class="material-icons md-36">clear</i>
          </button>
        </div> : null}
      </div>
    </div>
  );
}

function AddToggle(props){
  return (
    <div className = 'switch-wrapper'>
      <button className='edit-btn sconed-btn' onClick = {()=>(
        props.addItem(props.switchId)
      )}>Add icon here</button>
    </div>
  )
}

function Sun(props){
  const size = props.status
  return (
    <div className={'sun ' + size} >
      <div className='sun small'></div>
    </div>
  )
}

function Win(props) {

  let showHide = ''
  if(props.winHide == 'win'){showHide = 'show' } else {showHide = 'hide'}

  return(
    <div className={'win win-' + showHide }>
        <div className = 'win-content'>
          <div className ='title'>
            <h1 className='main-icon'>🐓</h1>
            <h1>Good Morning!</h1>
          </div>
          <button className ='main-btn' onClick = {props.winOnClick}>Start</button>
        </div>
        <Footer />
    </div>
  )
}

function List(props) {
  
  const [items, setItems] = useState(["💩", "👖", "👕", "😬", "👟", "🧥"]);
  const [switchsState, setSwitchState] = useState(Array(items.length).fill('off'))
  const [successOnOff, setSuccessOnOff] = useState(['off','❤️']);
  const [runAmin, setRunAnim] = useState('') 
  const [screen, setScreen] = useState('win')
  const [size, setSize] = useState('sun-win');
  const [listHide, setListHide] = useState('list-hide');
  const [edit, setEdit] = useState(false);
  const [editText, setEditText ] = useState('Edit list')

  // Setting the background acourding to the switches
  const ons = switchsState.map(x =>(x == 'on'))
  const background = (ons.filter(Boolean).length/items.length*100).toFixed(1)
  const bgStyle = {
    'background-image' : 'linear-gradient(135deg, #00adff 0%, #5ac2f3 ' + background +'%)'  
  }

  // On switch change
  const sendSwitchState = (i,val) => {
    // pass the value from the switch to the list
    const switchs = switchsState.slice();
    switchs[i] = val;
    setSwitchState(switchs)
    ReactGA.event({
      category: 'Switch ' + i,
      action: 'Click ' + val
    });

    // Switch to "Win" mode when all switchs are On
    if(val == 'on' && ons.filter(Boolean).length == (items.length-1)) {
      setTimeout(() => {
        setScreen('win')
        setSize('sun-win')
      },900)
      
      setTimeout(() => {
        setListHide('list-hide')
      },1000)
      ReactGA.event({
        category: 'Status',
        action: 'Win'
      });
    };
  }

  const showAnim = (i) => {
    setSuccessOnOff(['on',items[i]])
    setTimeout(() => {
      setRunAnim('run-anim')
    },10)
    setTimeout(() => {
      setSuccessOnOff(['off',items[i]])
      setRunAnim('')
    }, 2000);
  }

  const winOnClick = () => {
    setScreen('game')
    setListHide('show')
    setSize('sun')
    if(cookies.get('items-cookie') !== undefined) {
      setItems(cookies.get('items-cookie'))
    }
    setSwitchState(Array(items.length).fill('off'))
    console.log('switchsState is ' + switchsState)
  }

  const toggleEdit = () => {

    if(edit){
      setEdit(false)
      setScreen('win')
      setEditText('Edit list')
      setSize('sun-win')
      setListHide('list-hide')
      // Setting cookie
      const current = new Date();
      const nextYear = new Date();
      nextYear.setFullYear(current.getFullYear() + 1);
      cookies.set('items-cookie', items.slice(), { path: '/', expires: nextYear });

    } else {
      setEdit(true)
      setEditText('Save')
      setScreen('edit')
      setListHide('show')
      setSize('sun')
    }
    ReactGA.event({
      category: 'Click',
      action: 'Edit'
    });
  }

  // On edit mode - adding and item
  const addItem = (id, val) => {
    var emoji = prompt("Which Emoji would like to add?")
    if(emoji === null) return
    const newItems = items.slice()
    newItems.splice(id +1 , 0, emoji)
    setItems(newItems)
    ReactGA.event({
      category: 'Added icon',
      action: emoji
    });
  }

  // On edit mode - deleting and item
  const deleteItem = (id) => {
    ReactGA.event({
      category: 'Remove icon',
      action: items[id]
    });
    const newItems = items.slice()
    newItems.splice(id, 1)
    setItems(newItems)
    console.log(newItems)
  }

  return (
    <div className='list-container' style ={bgStyle}>
      <div className = 'edit-btn-wrapper'>
        {screen==='win' || screen==='edit'? <button className={'edit-btn main-btn ' + (screen==='win' ? 'no-bg-btn' : null)} onClick = {()=>(
            toggleEdit()
          )} >{editText}</button> : null}
        {screen === 'win' ? <button onClick={ ()=>{window.location.href = "mailto:dor@dordesign.com?Subject=Morning%20routine%20feedback"}} className='edit-btn main-btn no-bg-btn' type="button">Feedback</button> : null} 
      </div>
      <Success class={'success-' + successOnOff[0]} emoji={successOnOff[1]} runAmin={runAmin}/>
      <Win winOnClick={winOnClick} winHide={screen}/>
      <div className={"list " + listHide }>
        {items.map((item,i) => (
          [
          <Toggle key ={i} emoji={item} onOff={switchsState[i]} sendSwitchState={sendSwitchState} switchId={i} showAnim={showAnim} edit={edit} deleteItem = {deleteItem} items = {items} screen={screen}/>,
          edit ? <AddToggle key = {i + 'addKey'} addItem={addItem} switchId={i} emoji={item}/> : <div></div>
          ]
        ))}
      </div>
      <Sun status = {size}/>
    </div>
  );
}

function Footer(props) {
  return (
    <div className = 'footer'>
      <p>Created with ❤️ by <a href='http://www.dordesign.com' target='_blank'>Dor</a></p>
    </div>
  )
}

function App(props) {
  return (
    <div className="app">
      <List />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
