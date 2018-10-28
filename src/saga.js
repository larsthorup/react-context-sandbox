import fetchingJson from './fetchingJson';
import {weatherRequested, weatherReceived} from './action';

export const fetchingWeather = ({city}) => async (dispatch, getState) => {
  dispatch(weatherRequested);
  const state = getState();
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${state.auth.apikey}`;
  const {response, json} = await fetchingJson(url);
  console.log(json);
  dispatch(weatherReceived, {response, json});
};
