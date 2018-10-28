import React from 'react';
import {initialState, fetchingWeather} from "./action";

const AppContext = React.createContext();

export class Provider extends React.Component {
  constructor () {
    super();
    this.state = initialState;
  }

  render () {
    return (
      <AppContext.Provider value={{state: this.state, setState: this.setState.bind(this)}}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const connect = (mapStateToProps, reducerSet = {}) => (Component) => (ownProps) => {
  return (
  <AppContext.Consumer>
    {(store) => {
      const boundReducerSet = Object.entries(reducerSet).reduce((accumulator, [name, reducer]) => {
        const boundReducer = (payload) => { store.setState(reducer(store.state, payload)); };
        return Object.assign({[name]: boundReducer}, accumulator);
      }, {});
      const props = Object.assign(boundReducerSet, mapStateToProps(store.state, ownProps));
      return (
        <Component {...props} />
      );
    }}
  </AppContext.Consumer>
  );
};
