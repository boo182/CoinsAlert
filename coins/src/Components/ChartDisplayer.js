import React, { Component } from 'react'
import {Line, LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Legend} from 'recharts';
import moment from 'moment';

export default class ChartDisplayer extends Component {

    render() {
      const { alerts } = this.props;
      const data = alerts.length > 0
      ? alerts.map(item => {
          return {
              name: moment(item.createdAt).format('DD/MM'),
              alertedAt: item.alertedAt,
              amt: this.props.threshold.threshold,
          }
      })
      : [];
      console.log(data);
    return (
      <div>
        {data.length > 0 && <LineChart width={1000} height={500} data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis type="number" domain={[0, 1]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="alertedAt" stroke="#8884d8" />
        </LineChart>}
      </div>
    )
  }
}
