import React from "react";
import Datetime from "react-datetime";

function DatePicker({ value, onChange }) {
    return (
        <div>
            <Datetime value={value} onChange={value => onChange(value)} />
        </div>
    );
}

export default DatePicker;