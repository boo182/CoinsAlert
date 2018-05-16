import React, { Component } from 'react'
import { currencyDisplay } from '../utils/currencyUtils';
import { Card } from 'antd';
import moment from 'moment'

export default class AlertDisplayer extends Component {

  generateAlerts = () => {
      const { alerts, threshold } = this.props;
      return alerts.map(item => {
        const duration = moment(item.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a");
        return (<div key={item.id} style={{ borderBottom: '1px solid lightgrey', padding: '10px 0px 10px 0px' }}>
            <div style={{ fontWeight: 600 }}>{threshold.crypto} has reached {item.alertedAt}</div>
            <div>({duration})</div>
          </div>);
      }
    )
  }
  generateTitle = () => {
      const { threshold } = this.props;
      return `Threshold at ${threshold.threshold} ${currencyDisplay(threshold.currency)} on ${threshold.crypto}`
  }
  render() {
      this.generateTitle();
    return (
      <div>
        <Card
          title={this.generateTitle()}
          extra={<a onClick={this.props.onEmptyAlerts(this.props.threshold.id)}>Empty</a>}
          style={{ width: 400, maxHeight: '30vh', overflow: 'auto' }}
        >
            {this.generateAlerts()}
        </Card>
      </div>
    )
  }
}
