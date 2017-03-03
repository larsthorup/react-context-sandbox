import fetchJson from './fetchJson';


// reducers

function lockReducer (state, action) {
  return {
    ...state,
    auth: {}
  }
}

function unlockReducer (state, {apikey}) {
  return {
    ...state,
    auth: {
      apikey
    }
  }
}

function weatherReceivedReducer (state, {response, json}) {
  if (response.ok) {
    return {
      ...state,
      error: null,
      weather: json.weather.map((weather) => weather.description).join(', ')
    };
  } else {
    return {
      ...state,
      error: json.message,
      weather: null
    };
  }
}

function weatherRequestedReducer (state, action) {
  // eventually show a spinner, and hide it again in weatherReceivedReducer
  return state;
}

export const reducer = (state = {auth: {}}, action) => {
  switch (action.type) {
    case 'LOCK':
      return lockReducer(state, action);
    case 'UNLOCK':
      return unlockReducer(state, action);
    case 'WEATHER_RECEIVED':
      return weatherReceivedReducer(state, action);
    case 'WEATHER_REQUESTED':
      return weatherRequestedReducer(state, action);
    default:
      return state;
  }
}


// action creators, synchronous

export const lock = () => ({type: 'LOCK'});

export const unlock = (apikey) => ({type: 'UNLOCK', apikey});

const weatherRequested = () => ({type: 'WEATHER_REQUESTED'});

const weatherReceived = (response, json) => ({type: 'WEATHER_RECEIVED', response, json});


// action creators, asynchronous

export const fetchingWeather = (city) => (dispatch, getState) => {
  dispatch(weatherRequested())
  const state = getState();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${state.auth.apikey}`;
  fetchJson(url).then(([response, json]) => {
    dispatch(weatherReceived(response, json));
  });
}
