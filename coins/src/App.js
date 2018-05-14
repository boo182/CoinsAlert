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
    alerts: [],
  }

  componentWillMount() {
    this.fetcher('/coins', 'coins');
    this.coinAlert();
    this.fetcher('coins/getAlerts', 'alerts');
    this.fetcher('/coins/thresholds', 'thresholds');
    this.coinFetcher = Rx.interval(120000)
      .subscribe(() => {
        this.fetcher('/coins', 'coins');
        this.coinAlert();
      });
  }

  componentWillUnmount() {
    this.coinFetcher.unsuscribe();
  }

  onDelete = (id) => (e) => {
    e.preventDefault();
    this.setState({ loading: true });    
    fetch(`/coins/${id}`, { method: 'DELETE'})
    .then(res => res.json())
    .then(res => this.setState({ loading: false }))
    .catch(err => console.log(err));
  
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

  coinAlert = () => {
   const { thresholds, coins } = this.state;
   thresholds.forEach(item => {
     const res = coins && coins[item.crypto][item.currency.toUpperCase()];
     if(item.threshold < res) {
       this.alert(item.id);
     }
   })
  }

  alert = (id) => {
    this.setState({ loading: true });
    fetch('/coins/alert', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
      }),
    })
    .then(res => res.json())
    .then(res => this.setState({ loading: false, alerts: res }))
    .catch(err => console.log(err));
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
        <div style={{}}>
          <Input setThreshold={this.setThreshold} chosenCrypto={this.state.crypto} />
          <ThresholdList
            thresholds={this.state.thresholds}
            fetch={this.fetcher}
            update={this.state.loading}
            onDelete={this.onDelete}
            hits={this.state.alerts}
            />
        </div>

      </div>
    );
  }
}

export default App;
