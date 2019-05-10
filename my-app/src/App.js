import React, { Component } from 'react';
import ReactDOM from "react-dom";
import moment from "moment";
import axios from "axios";
import DatePicker from "./components/datePicker";
//import './App.css';

const INITIAL_STATE = {
  dateFrom: new moment(),
  dateTo: new moment(),
  gismeteo: false,
  yandex: false,
  accuWeather: false,
  oneDay: false,
  threeDay: false,
  fiveDay: false
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE
  }

  onDateFromChange = date => {
    this.setState({ dateFrom: date });
  };

  onDateToChange = date => {
    this.setState({ dateTo: date });
  };

  onCheckboxChange = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onClickSendData = async () => {
    await axios.post("http://localhost:5000/sendUserData", this.state);
    this.setState(INITIAL_STATE)
  };

  render() {
    const { gismeteo, yandex, accuWeather, oneDay, threeDay, fiveDay, dateFrom, dateTo } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Статистика точности сайтов прогнозов погоды по Иркутской области
          </h1>
          <p>
            Выберите сервис:
            <input name="gismeteo" type="checkbox" checked={gismeteo} onChange={this.onCheckboxChange} /> Gismeteo
            <input name="yandex" type="checkbox" checked={yandex} onChange={this.onCheckboxChange} /> Yandex
            <input name="accuWeather" type="checkbox" checked={accuWeather} onChange={this.onCheckboxChange} /> AccuWeather
          </p>
          <p>
            Выберите глубину прогноза:
            <input name="oneDay" type="checkbox" checked={oneDay} onChange={this.onCheckboxChange} /> 1 день
            <input name="threeDay" type="checkbox" checked={threeDay} onChange={this.onCheckboxChange} /> 3 дня
            <input name="fiveDay" type="checkbox" checked={fiveDay} onChange={this.onCheckboxChange} /> 5 дней
          </p>
          <p>
            Выберите интервал:
          </p>
          <div>
            <DatePicker value={dateFrom} onChange={this.onDateFromChange} />
            <DatePicker value={dateTo} onChange={this.onDateToChange} />
          </div>
          <p>
            <button type="button" onClick={this.onClickSendData}>
              Показать оценку
            </button>
          </p>
        </header>
      </div>
    )
  }
}

export default App;