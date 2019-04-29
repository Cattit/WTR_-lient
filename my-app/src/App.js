import React from 'react';
//import './App.css';

class App extends React.Component {
  constructor(props) { super(props); this.state = { dateStart: new Date(), dateEnd: new Date() }; this.handleChange = this.handleChange.bind(this);}
  handleChange(date){
    this.setState({dateStart:date})
  }
  render() {
    const { dateStart, dateEnd } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <h1>
            Статистика точности сайтов прогнозов погоды по Иркутской области
          </h1>
          <p>
            Выберите сервис:
            <input name="gismeteo" type="checkbox" /> Gismeteo
            <input name="yandex" type="checkbox" /> Yandex
            <input name="accuWeather" type="checkbox" /> AccuWeather
          </p>
          <p>
            Выберите глубину прогноза:
            <input name="oneDay" type="checkbox" /> 1 день
            <input name="threeDay" type="checkbox" /> 3 дня
            <input name="fiveDay" type="checkbox" /> 5 дней
          </p>
          <p>
            Выберите интервал:
            от <input type="date" name="date_start"></input> {/* value={dateStart} onChange={this.handleChange} */}
            до <input type="date" name="date_end"></input>
          </p>
          <p>
            <button onClick>
              Показать оценку
            </button>
          </p>
        </header>
      </div>
    )
  }
}

export default App;