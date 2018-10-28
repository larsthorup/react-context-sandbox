import React from 'react';
import {connect} from "./store";

function Weather (props) {
  let city = null;
  const onForecast = (ev) => {
    ev.preventDefault(); // Note: prevent traditional form submit from reloading the page
    props.fetchingWeather({city: city.value});
  };
  return (
    <div>
      <h1>Weather</h1>
      <form onSubmit={onForecast}>
        <input autoFocus placeholder="city" ref={el => city = el}/>
        <button>Forecast</button>
      </form>
      {props.error ? <strong>{props.error}</strong> : <p>{props.weather}</p>}
    </div>
  );
}

function mapStateToProps (state) {
  return {
    apikey: state.auth.apikey,
    error: state.error,
    weather: state.weather,
  };
}

export default connect(mapStateToProps, {
  // fetchingWeather
})(Weather);
