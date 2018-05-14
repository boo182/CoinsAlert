import React, { Component } from 'react'
import { List, Button, Badge } from 'antd';

export default class ThresholdList extends Component {
  
  componentWillUpdate(nextProps) {
    if(nextProps.update !== this.props.update) {
      this.props.fetch('/coins/thresholds', 'thresholds');
    }
  }
  currencyDisplay = currency => {
    if (currency === "eur") {
      return '€';
    } else if (currency === 'usd') {
      return '$';
    } else if (currency === 'btc') {
      return '₿'
    }
  };

  createBadge = (id) => {
    const res = this.props.hits.filter(hit => hit.alertId === id);
    const resp = res[0];
    return resp && resp.alerts;
  };


  generateData = () => {
    const { thresholds } = this.props;
    return thresholds.map(item => {
      return {
          id: item.id,
          description: (
          <div style={{display: 'flex', marginLeft: '20px', justifyContent: 'space-between'}}>
            <div style={{display: 'flex'}} >
              <h3>n°{item.id}</h3>
              <div style={{marginLeft: '20px' }}>
                <span style={{ fontWeight: 600 }}>{item.threshold} {this.currencyDisplay(item.currency)} </span>
                on <span style={{ fontWeight: 600 }}>{item.crypto}</span>
              </div>
            </div>
            {thresholds && <Badge count={this.createBadge(item.id)}/>}
            <Button
              style={{ marginRight: '20px' }} 
              type="danger" 
              size={'small'}
              onClick={this.props.onDelete(item.id)}
            >
            X
            </Button>
          </div>)
        };
    })
  }
  render() {
    return (
      <div style={{
        margin: '50px 0px 0px 20px',
        width: '30vw',
        border: '1px solid grey',
        borderRadius: '8px',
        maxHeight: '50vh', 
        overflowY: 'scroll'
      }}>
        <List
          itemLayout="horizontal"
          dataSource={this.generateData()}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                  description={<div style={{ whiteSpace: 'pre-wrap' }}>{item.description}</div>}
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
}
