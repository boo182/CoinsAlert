import { InputNumber, Button } from "antd";
import React, { Component } from "react";

export default class ThresholdInput extends Component {
  state = {
    currency: "eur",
    threshold: 0,
  };
  currencyDisplay = () => {
    const { currency } = this.state;
    if (currency === "eur") {
      return '€';
    } else if (currency === 'usd') {
      return '$';
    } else if (currency === 'btc') {
      return '₿'
    }
  };

  buttonsRenderer = () => {
    const currencies = [
      {label: 'eur', sign: '€'},
      {label: 'usd', sign: '$'},
      {label: 'btc', sign: '₿'}
    ];
    return currencies.map(item => (
      <Button
        key={item.label}
        type="primary"
        style={{ marginRight: '10px' }}
        onClick={() => this.setState({ currency: item.label})}>
      {item.sign}
      </Button>
    ));
  }

  render() {
    const isEnabled = this.state.threshold && this.props.chosenCrypto;
    return (
      <div>
        <div style={{ margin: '0px 0px 10px 20px' }}>
         {this.buttonsRenderer()}
        </div>
      <div
        style={{ marginLeft: "20px", display: "flex", alignItems: "center" }}
      >
        <InputNumber
          style={{width: 'auto' }}
          formatter={value => `${this.currencyDisplay()} ${value}`}
          min={0}
          defaultValue={0}
          onChange={(e) => this.setState({ threshold: e })}
        />
         <Button
          style={{marginLeft: '30px' }}
          type="primary"
          disabled={!isEnabled}
          onClick={() => this.props.setThreshold(this.state)}>
          Set Threshold
         </Button>
      </div>
      {this.props.chosenCrypto &&
        <p style={{ margin:'20px' }}> 
          Set threshold on <span style={{ fontWeight : 'bolder' }}>
            {this.props.chosenCrypto}</span> to <span style={{ fontWeight : 'bolder' }}>
              {this.state.threshold} {this.currencyDisplay()}
            </span>
        </p>}
      </div>
    );
  }
}
