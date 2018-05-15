import React, { Component } from 'react'
import { currencyDisplay } from '../utils/currencyUtils';
import { Card } from 'antd';

export default class AlertDisplayer extends Component {

  generateAlerts = () => {
      const { alerts, threshold } = this.props;
      return alerts.map(item =>
        <p key={item.id}>{threshold.crypto} has reached {item.alertedAt}</p>
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
