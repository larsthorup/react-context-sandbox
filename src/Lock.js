import React from 'react';
import {connect} from 'react-redux';
import {lock, unlock} from './action';

function Lock (props) {
  let apikey = null;
  const lock = () => {
    props.lock();
  };
  const unlock = (ev) => {
    ev.preventDefault(); // Note: prevent traditional form submit from reloading the page
    props.unlock(apikey.value);
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

export default connect(mapPropsToState, {lock, unlock})(Lock);
