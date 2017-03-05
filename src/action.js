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

export const reducer = (state = {auth: {}}, action) => {
  switch (action.type) {
    case lock.type:
      return lockReducer(state, action);
    case unlock.type:
      return unlockReducer(state, action);
    case weatherReceived.type:
      return weatherReceivedReducer(state, action);
    default:
      return state;
  }
}


// action creators, synchronous

export const lock = () => ({type: lock.type});
lock.type = 'LOCK';

export const unlock = (apikey) => ({type: unlock.type, apikey});
unlock.type = 'UNLOCK';

const weatherRequested = () => ({type: weatherRequested.type});
weatherRequested.type = 'WEATHER_REQUESTED';

const weatherReceived = (response, json) => ({type: weatherReceived.type, response, json});
weatherReceived.type = 'WEATHER_RECEIVED';

// action creators, asynchronous

export const fetchingWeather = (city) => (dispatch, getState) => {
  dispatch(weatherRequested());
  const state = getState();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${state.auth.apikey}`;
  return fetchJson(url).then(([response, json]) => {
    dispatch(weatherReceived(response, json));
  });
}
