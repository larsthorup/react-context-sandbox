import fetchingJson from './fetchingJson';
import {register} from './actionLib';

// synchronous

export const initialState = {
  auth: {}
};

export const lock = (state) => {
  return {
    ...state,
    auth: {}
  }
};

export const unlock = (state, {apikey}) => {
  return {
    ...state,
    auth: {
      apikey
    }
  }
};

const weatherRequested = () => {};

const weatherReceived = (state, {response, json}) => {
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
};

// asynchronous

export const fetchingWeather = ({city}) => async (dispatch, getState) => {
  dispatch(weatherRequested);
  const state = getState();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${state.auth.apikey}`;
  const {response, json} = await fetchingJson(url);
  console.log(json);
  dispatch(weatherReceived, {response, json});
}
