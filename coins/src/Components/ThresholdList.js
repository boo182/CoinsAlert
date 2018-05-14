import React, { Component } from 'react'
import { List } from 'antd';

export default class ThresholdList extends Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }
  generateData = () => {
    const { thresholds } = this.props;
    return thresholds.map(item => {
      return {
          id: item.id,
          title: `Threshold: ${item.threshold}\nCurrency: ${item.currency}\nCrypto: ${item.crypto}`
        };
    })
  }
  render() {
    return (
      <div>
        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={this.generateData()}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                  title={<div>n°{item.id}</div>}
                  description={<div style={{ whiteSpace: 'pre-wrap' }}>{item.title}</div>}
              />
            </List.Item>
          )}
        />
      </div>
    )
  }
}
