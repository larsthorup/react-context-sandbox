import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';

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
    this.props.onLock();
  }

  onUnlock = (ev) => {
    ev.preventDefault(); // Note: prevent traditional form submit from reloading the page
    this.setState({
      ...this.state,
      isLocked: false
    });
    this.props.onUnlock(this.state.apikey);
  }
}
Lock.propTypes = {
  onLock: PropTypes.func.isRequired,
  onUnlock: PropTypes.func.isRequired
};

function mapDispatchToProps (dispatch) {
  return {
    onLock: () => dispatch({type: 'LOCK'}),
    onUnlock: (apikey) => dispatch({type: 'UNLOCK', apikey})
  };
}

export default connect(state => ({}), mapDispatchToProps)(Lock);
