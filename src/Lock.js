import React from 'react';
import {connect} from "./store";

function Lock (props) {
  let apikey = null;
  const lock = () => {
    props.action.lock();
  };
  const unlock = (ev) => {
    ev.preventDefault(); // Note: prevent traditional form submit from reloading the page
    props.action.unlock({apikey: apikey.value});
  };
  return props.isUnlocked ? (
    <button onClick={lock}>Lock</button>
  ) : (
    <form onSubmit={unlock}>
      <input autoFocus placeholder="apikey" ref={el => apikey = el}/>
      <button>Unlock</button>
    </form>
  );
}

function mapPropsToState (state) {
  return {
    isUnlocked: state.auth.apikey
  };
}

export default connect(mapPropsToState)(Lock);
