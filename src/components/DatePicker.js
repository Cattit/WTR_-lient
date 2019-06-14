import React from "react";
import Datetime from "react-datetime";
import moment from 'moment';
import 'moment/locale/ru';
import './DatePicker.css'

const DATE_FORMAT = 'YYYY-MM-DD'

const DatePicker = ({ field, form, ...rest }) => {
    const handleChange = value => {
        let dateValue = value;
        if (value instanceof moment) {
            dateValue = moment(value).format(DATE_FORMAT);
        }

        form.setFieldValue(field.name, dateValue);
    };

    return (
        <div>
            <Datetime {...rest} id={field.name} name={field.name} dateFormat={DATE_FORMAT} defaultValue={new moment().format('YYYY-MM-DD')} timeFormat={false} onChange={handleChange} />
        </div>
    );
}

export default DatePicker