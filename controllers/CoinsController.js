import {fetcher} from './fetcher';
import CoinsModel from '../models/coins';
class coinsController {

    async getCoins() {
        const coins = await fetcher(['ETH', 'BTC', 'XRP']);
        return coins
    }
    async setThreshold(crypto, threshold, currency) {
        const res = await CoinsModel.setThreshold(crypto, threshold, currency);
        return res;
    }
    async getThresholds() {
        const res = await CoinsModel.getThresholds();
        return res;
    }
}

const CoinsController = new coinsController;
export default CoinsController