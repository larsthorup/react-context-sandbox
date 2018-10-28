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

export const weatherRequested = () => {};

export const weatherReceived = (state, {response, json}) => {
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
