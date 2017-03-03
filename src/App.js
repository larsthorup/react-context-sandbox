import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import Lock from './Lock';
import Weather from './Weather';

function App (props) {
  return (
    <div className="App">
      <div className="App-header">
        <Lock/>
      </div>
      {props.isUnlocked ? <Weather/> : null}
    </div>
  );
}

function mapStateToProps (state) {
  return {
    isUnlocked: state.auth.apikey
  };
}

export default connect(mapStateToProps)(App);
