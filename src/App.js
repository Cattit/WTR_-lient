import React, { Component, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import DatePicker from "./components/DatePicker";
import Table from "./components/Table";
import Chart from "./components/Chart";
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
    <Form.Check
      name={name}
      id={id}
      label={label}
      value={value}
      checked={value}
      onChange={onChange}
    />
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
    const { value, children } = this.props;

    return (
      React.Children.map(children, child => {
        return React.cloneElement(child, {
          field: {
            value: value.includes(child.props.id),
            onChange: this.handleChange
          }
        })
      })
    );
  }
}

const App = () => {
  const [data, setData] = useState(null);
  return (
    <Container>
      <h1>Статистика точности сайтов прогнозов погоды по Иркутской области</h1>
      <Formik
        initialValues={{
          sources: [],
          depths: [],
          dateStart: new moment().format('YYYY-MM-DD'),
          dateEnd: new moment().format('YYYY-MM-DD'),
        }}


        onSubmit={async (values, actions) => {
          try {
            const { data } = await axios.post('http://localhost:5000/sendUserData', values)
            setData(data);
          } catch (error) {
            console.error(error)
          }
          finally {
            actions.setSubmitting(false);
          }
        }}

        render={({ handleSubmit, setFieldValue, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Row>
              <Col>
                <Form.Group controlId="form.depths">
                  <Form.Label>Выберите глубину прогноза</Form.Label>
                  <CheckboxGroup
                    id="depths"
                    value={values.depths.sort()}
                    onChange={setFieldValue}
                  >
                    <Field component={Checkbox} name="depths" id="1" label="1 день" />
                    <Field component={Checkbox} name="depths" id="3" label="3 дня" />
                    <Field component={Checkbox} name="depths" id="5" label="5 дней" />
                  </CheckboxGroup>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="form.sources">
                  <Form.Label>Выберите сервис</Form.Label>
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
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Label>Выберите интервал</Form.Label>
            <Form.Group controlId="form.dateInterval">
              <Form.Row >
                <Col xs lg={2}>
                  <Field component={DatePicker} name='dateStart' />
                </Col>
                <Col xs lg={2}>
                  <Field component={DatePicker} name='dateEnd' />
                </Col>
              </Form.Row>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Показать оценку
          </Button >
            <Form.Group>
              {data && <Table id="collapse-table" data={data} />}
            </Form.Group>
            <Form.Group>
              {data && <Chart id="collapse-chart" data={data} />}
            </Form.Group>
          </Form>
        )}
      />
    </Container>);
}

export default App; 
