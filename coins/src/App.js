import React, { Component } from 'react';
import Input from './Components/Input';

import { Table } from 'antd';
import 'antd/dist/antd.css';
import * as Rx from 'rxjs';

class App extends Component {
  state = {
    loading: false,
    crypto: null,
    coins: null,
    columns: [{
      title: 'Crypto',
      dataIndex: 'crypto',
      key: 'crypto',
    }, {
      title: 'EUR',
      dataIndex: 'eur',
      key: 'eur',
    }, {
      title: 'USD',
      dataIndex: 'usd',
      key: 'usd',
    }, {
      title: 'BTC',
      dataIndex: 'btc',
      key: 'btc',
    }],
  }

  componentWillMount() {
    this.fetcher()
    this.coinFetcher = Rx.interval(120000)
      .subscribe(this.fetcher);
  }

  componentWillUnmount() {
    this.coinFetcher.unsuscribe();
  }
  fetcher = () => {
    fetch('/coins')
    .then(res => res.json())
    .then(res => this.setState({
      coins: res
    }));
  }

  createDataSource = () => {
    const { coins } = this.state;
    let dataSource = []; 
    for(let coin in coins ) {
      dataSource.push({
        key: coin,
        crypto: coin,
        btc: coins[coin].BTC,
        usd: coins[coin].USD,
        eur: coins[coin].EUR,
      });
    }
    return dataSource;
  }

  setThreshold = (values) => {
    this.setState({ loading: true });
    fetch('/coins/threshold', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        currency: values.currency,
        threshold: values.threshold,
        crypto: this.state.crypto,
      }),
    })
    .then(res => res.json())
    .then(res => this.setState({ loading: false }))
    .catch(err => console.log(err));
  }
  render() {
    const dataSource = this.createDataSource();
    return (
      <div className="App">
        <Table
          style={{ cursor: 'pointer' }}
          dataSource={dataSource}
          columns={this.state.columns}
          onRow={(record) => ({onClick: () => {
              this.setState({ crypto: record.crypto });
            }
          })}
          />
        <Input setThreshold={this.setThreshold} chosenCrypto={this.state.crypto} />
      </div>
    );
  }
}

export default App;
