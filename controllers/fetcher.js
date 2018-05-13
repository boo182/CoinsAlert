import axios from 'axios';
const url = 'https://min-api.cryptocompare.com/data';

export const fetcher = async (params) => {
    const coinList = params.join(',');
    return axios.get(`${url}/pricemulti?fsyms=${coinList}&tsyms=BTC,USD,EUR`)
    .then(res => res.data);
}
