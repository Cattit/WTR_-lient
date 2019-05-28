import React, { Component } from "react";
import axios from "axios";
import DatePicker from "./components/DatePicker";
import Table from "./components/Table";
import { Formik, Field } from "formik";
import moment from 'moment';

//import './App.css';

// Checkbox input
const Checkbox = ({
  field: { name, value, onChange },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div>
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

// Checkbox group
class CheckboxGroup extends Component {
  handleChange = event => {
    const target = event.currentTarget;
    let valueArray = [...this.props.value] || [];

    if (target.checked) {
      valueArray.push(target.id);
    } else {
      valueArray.splice(valueArray.indexOf(target.id), 1);
    }

    this.props.onChange(this.props.id, valueArray);
  };

  render() {
    const { value, label, children } = this.props;

    return (
      <div>
        <fieldset>
          <legend>{label}</legend>
          {React.Children.map(children, child => {
            return React.cloneElement(child, {
              field: {
                value: value.includes(child.props.id),
                onChange: this.handleChange
              }
            });
          })}
        </fieldset>
      </div>
    );
  }
}
/*
const INITIAL_STATE = {
  dateStart: new moment(),
  dateEnd: new moment(),
  gismeteo: false,
  yandex: false,
  accuWeather: false,
  oneDay: false,
  threeDay: false,
  fiveDay: false,
  masMark: [],
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE
  }

  onDateStartChange = date => {
    this.setState({ dateStart: date });
  };

  onDateEndChange = date => {
    this.setState({ dateEnd: date });
  };

  onCheckboxChange = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  onClickSendData = async () => {
    const {data} = await axios.post("http://localhost:5000/sendUserData", this.state);

    this.setState(INITIAL_STATE);
    this.setState({ masMark: data});
  };

  render() {
    const { masMark, gismeteo, yandex, accuWeather, oneDay, threeDay, fiveDay, dateStart, dateEnd } = this.state;
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
            <DatePicker value={dateStart} onChange={this.onDateStartChange} />
            <DatePicker value={dateEnd} onChange={this.onDateEndChange} />
          </div>
          <p>
            <button type="button" onClick={this.onClickSendData}>
              Показать оценку
            </button>
          </p>
        </header>
        <Table data={masMark} />
      </div>
    )
  }
}
*/

const App = () => (
  <div className="App">
    <h1>Статистика точности сайтов прогнозов погоды по Иркутской области</h1>
    <Formik
      initialValues={{
        sources: [],
        depths: [],
        dateStart: new moment().format('DD-MM-YYYY'),
        dateEnd: new moment().format('DD-MM-YYYY'),
      }}


      onSubmit={async (values, actions) => {
        await axios.post('http://localhost:5000/sendUserData', values)
        // req.body.depths, req.body.sources, req.body.dateStart, req.body.dateEnd
        console.log(JSON.stringify(values, null, 2));
        actions.setSubmitting(false);
      }}

      render={({ handleSubmit, setFieldValue, values, isSubmitting }) => (
        <form onSubmit={handleSubmit}>
          <h2>Выберите глубину прогноза</h2>
          <CheckboxGroup
            id="depths"
            label="Выберите глубину прогноза"
            value={values.depths}
            onChange={setFieldValue}
          >
            <Field component={Checkbox} name="depths" id="1" label="1 день" />
            <Field component={Checkbox} name="depths" id="3" label="3 дня" />
            <Field component={Checkbox} name="depths" id="5" label="5 дней" />
          </CheckboxGroup>
          <h2>Выберите сервис</h2>
          <CheckboxGroup
            id="sources"
            label="Выберите сервис"
            value={values.sources}
            onChange={setFieldValue}
          >
            <Field
              component={Checkbox}
              name="sources"
              id="gismeteo"
              label="Gismeteo"
            />
            <Field
              component={Checkbox}
              name="sources"
              id="yandex"
              label="Yandex"
            />
            <Field
              component={Checkbox}
              name="sources"
              id="accuWeather"
              label="AccuWeather"
            />
          </CheckboxGroup>
          <h2>Выберите интервал:</h2>
          <div>
            <Field component={DatePicker} name='dateStart' />
            <Field component={DatePicker} name='dateEnd' />
          </div>
          <button type="submit" disabled={isSubmitting}>
            Показать оценку
          </button>
          <Table sources={values.sources} depth={values.depths} />
        </form>
      )}
    />
  </div>
);

export default App;
