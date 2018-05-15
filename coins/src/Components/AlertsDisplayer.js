import React, { Component } from 'react'
import { currencyDisplay } from '../utils/currencyUtils';
import { Card } from 'antd';
import moment from 'moment'

export default class AlertDisplayer extends Component {

  generateAlerts = () => {
      const { alerts, threshold } = this.props;
      console.log(alerts);
      return alerts.map(item => {
        const duration = moment.duration(item.CreatedAt).humanize();
        console.log(moment(item.CreatedAt).fromNow());
        return <p key={item.id}>{threshold.crypto} has reached {item.alertedAt} ({duration})</p>
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
