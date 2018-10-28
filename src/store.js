import React from 'react';
import {initialState} from "./action";

const AppContext = React.createContext();

export class Provider extends React.Component {
  constructor () {
    super();
    this.state = initialState;
  }

  dispatch (reducer, payload) {
    this.setState(reducer(this.state, payload));
  }

  getState () {
    return this.state;
  }

  render () {
    return (
      <AppContext.Provider value={{dispatch: this.dispatch.bind(this), getState: this.getState.bind(this)}}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export const connect = (mapStateToProps, reducerSet = {}, sagaSet = {}) => (Component) => (ownProps) => {
  return (
    <AppContext.Consumer>
      {(store) => {
        const boundReducerSet = Object.entries(reducerSet).reduce((accumulator, [name, reducer]) => {
          const boundReducer = (payload) => store.dispatch(reducer, payload);
          return Object.assign({[name]: boundReducer}, accumulator);
        }, {});
        const boundSagaSet = Object.entries(sagaSet).reduce((accumulator, [name, saga]) => {
          const boundSaga = (payload) => {
            saga(payload)(store.dispatch, store.getState);
          };
          return Object.assign({[name]: boundSaga}, accumulator);
        }, {});
        const props = Object.assign({}, mapStateToProps(store.getState(), ownProps), boundReducerSet, boundSagaSet);
        return (
          <Component {...props} />
        );
      }}
    </AppContext.Consumer>
  );
};
