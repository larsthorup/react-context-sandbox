import React from 'react';
import {initialState, fetchingWeather} from "./action";

const AppContext = React.createContext();

export class Provider extends React.Component {
  constructor () {
    super();
    this.state = initialState;

    this.action = { // ToDo: extract
      fetchingWeather: ({city}) => {},
      lock: () => {this.setState({auth: {}})},
      unlock: ({apikey}) => {this.setState({auth: {apikey}})}
    };
  }

  render () {
    return (
      <AppContext.Provider value={{state: this.state, action: this.action}}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const connect = (mapStateToProps) => (Component) => (ownProps) => {
  return (
  <AppContext.Consumer>
    {(store) => {
      const props = Object.assign({action: store.action}, mapStateToProps(store.state, ownProps));
      return (
        <Component {...props} />
      );
    }}
  </AppContext.Consumer>
  );
};
