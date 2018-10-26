import fetchingJson from './fetchingJson';
import {register} from './actionLib';

// action creators and reducers, synchronous

export const initialState = {
  auth: {}
};

export const lock = register('LOCK', (state) => {
  return {
    ...state,
    auth: {}
  }
});

export const unlock = register('UNLOCK', (state, {apikey}) => {
  return {
    ...state,
    auth: {
      apikey
    }
  }
});

const weatherRequested = register('WEATHER_REQUESTED');

const weatherReceived = register('WEATHER_RECEIVED', (state, {response, json}) => {
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
});

// action creators, asynchronous

export const fetchingWeather = ({city}) => async (dispatch, getState) => {
  dispatch(weatherRequested());
  const state = getState();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${state.auth.apikey}`;
  const {response, json} = await fetchingJson(url);
  dispatch(weatherReceived({response, json}));
}
