import {fetcher} from './fetcher';
import CoinsModel from '../models/coins';
import { prepareMail } from '../utils/emailUtils';
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

    async deleteThreshold(id) {
        return await CoinsModel.deleteThreshold(id);
    }

    async newAlert(id) {
        this.sendMail(id);
        return await CoinsModel.newAlert(id);
    }

    async getAlerts() {
        return await CoinsModel.getAlerts();
    }
    async sendMail(id) {
        const alert = await CoinsModel.getThreshold(id);
        prepareMail(alert);
    }
}

const CoinsController = new coinsController;
export default CoinsController