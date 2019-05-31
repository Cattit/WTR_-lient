import React, { Component, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import DatePicker from "./components/DatePicker";
import Table from "./components/Table";
import { Formik, Field } from "formik";
import moment from 'moment';
import './App.css';

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

const App = () => {
  const [data, setData] = useState([]);
  return (
    <div className="App">
      <h1>Статистика точности сайтов прогнозов погоды по Иркутской области</h1>
      <Formik
        initialValues={{
          sources: [],
          depths: [],
          dateStart: new moment().format('YYYY-MM-DD'),
          dateEnd: new moment().format('YYYY-MM-DD'),
        }}


        onSubmit={async (values, actions) => {
          const { data } = await axios.post('http://localhost:5000/sendUserData', values)
          setData(data);
          actions.setSubmitting(false);
        }}

        render={({ handleSubmit, setFieldValue, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <h2>Выберите глубину прогноза</h2>
            <CheckboxGroup
              id="depths"
              label="Выберите глубину прогноза"
              value={values.depths.sort()}
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
              value={values.sources.sort()}
              onChange={setFieldValue}
            >
              <Field
                component={Checkbox}
                name="sources"
                id="Gismeteo"
                label="Gismeteo"
              />
              <Field
                component={Checkbox}
                name="sources"
                id="Yandex"
                label="Yandex"
              />
              <Field
                component={Checkbox}
                name="sources"
                id="AccuWeather"
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
            {data.length > 0 && <Table data={data} sources={values.sources} depth={values.depths} />}
          </Form>
        )}
      />
    </div>
  );
}

export default App;
