import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


export default class Chart extends PureComponent {

  transformData = data => data.column.map((source, index) => ({
    source,
    mark: data.mark.reduce((prev, curr) => [...prev, curr.mark[index]], []).reduce((a, b) => a + b) / data.mark.length
  }))



  render() {
    const { data } = this.props;
    console.log(this.transformData(data));
    return (
      <LineChart
        width={500}
        height={300}
        data={this.transformData(data)}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="source" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="mark" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    );
  }
}
