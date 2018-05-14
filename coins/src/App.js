import React, { Component } from 'react';
import Input from './Components/Input';
import ThresholdList from './Components/ThresholdList';
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
    thresholds: [],
  }

  componentWillMount() {
    this.fetcher('/coins', 'coins');
    this.fetcher('/coins/thresholds', 'thresholds');
    this.coinFetcher = Rx.interval(120000)
      .subscribe(this.fetcher('/coins', 'coins'));
  }

  componentWillUnmount() {
    this.coinFetcher.unsuscribe();
  }

  fetcher = (url, state) => {
    fetch(url)
    .then(res => res.json())
    .then(res => {
      this.setState({
      [state]: res
    })
    });
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
    console.log(this.state.thresholds);
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
        <ThresholdList thresholds={this.state.thresholds}/>

      </div>
    );
  }
}

export default App;
