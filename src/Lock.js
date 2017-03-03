import React, {Component} from 'react';
import {connect} from 'react-redux';
import {lock, unlock} from './action';

class Lock extends Component {
  constructor () {
    super();
    this.state = {
      apikey: null,
      isLocked: true
    };
  }

  render () {
    return this.state.isLocked ? (
      <form onSubmit={this.onUnlock}>
        <input autoFocus placeholder="apikey" onChange={this.onChange}/>
        <button>Unlock</button>
      </form>
    ) : (
      <button onClick={this.onLock}>Lock</button>
    );
  }

  onChange = (ev) => {
    this.setState({
      ...this.state,
      apikey: ev.target.value
    });
  }

  onLock = () => {
    this.setState({
      ...this.state,
      isLocked: true
    });
    this.props.lock();
  }

  onUnlock = (ev) => {
    ev.preventDefault(); // Note: prevent traditional form submit from reloading the page
    this.setState({
      ...this.state,
      isLocked: false
    });
    this.props.unlock(this.state.apikey);
  }
}

function mapPropsToState (state) {
  return {};
}

export default connect(mapPropsToState, {lock, unlock})(Lock);
