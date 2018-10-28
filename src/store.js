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

export const connect = (mapStateToProps, reducerSet = {}, sagaSet = {}) => (Component) => (ownProps) => {
  return (
  <AppContext.Consumer>
    {(store) => {
      const dispatch = (reducer, payload) => store.setState(reducer(store.state, payload));
      const getState = () => store.state;
      const boundReducerSet = Object.entries(reducerSet).reduce((accumulator, [name, reducer]) => {
        const boundReducer = (payload) => dispatch(reducer, payload);
        return Object.assign({[name]: boundReducer}, accumulator);
      }, {});
      const boundSagaSet = Object.entries(sagaSet).reduce((accumulator, [name, saga]) => {
        const boundSaga = (payload) => {
          saga(payload)(dispatch, getState);
        };
        return Object.assign({[name]: boundSaga}, accumulator);
      }, {});
      const props = Object.assign({}, mapStateToProps(store.state, ownProps), boundReducerSet, boundSagaSet);
      return (
        <Component {...props} />
      );
    }}
  </AppContext.Consumer>
  );
};
