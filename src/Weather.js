import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchingWeather} from './action';

class Weather extends Component {
  constructor () {
    super();
    this.state = {
      city: '',
    };
  }

  render () {
    return (
    <div>
      <h1>Weather</h1>
      <form onSubmit={this.onForecast}>
        <input autoFocus placeholder="city" onChange={this.onCityChange}/>
        <button>Forecast</button>
      </form>
      {this.props.error ? <strong>{this.props.error}</strong> : <p>{this.props.weather}</p>}
    </div>
    );
  }

  onCityChange = (ev) => {
    this.setState({...this.state, city: ev.target.value});
  }

  onForecast = (ev) => {
    ev.preventDefault(); // Note: prevent traditional form submit from reloading the page
    this.props.fetchingWeather(this.state.city);
  }
}

function mapStateToProps (state) {
  return {
    apikey: state.auth.apikey,
    error: state.error,
    weather: state.weather,
  };
}

export default connect(mapStateToProps, {fetchingWeather})(Weather);
