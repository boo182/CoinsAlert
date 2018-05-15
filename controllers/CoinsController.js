import {fetcher} from './fetcher';
import CoinsModel from '../models/coins';
import { prepareMail, notification } from '../utils/emailUtils';
class coinsController {

    async getCoins() {
        const cryptos = await CoinsModel.getCryptos();
        const coins = await fetcher(cryptos);
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

    async newAlert(id, alertedAt) {
        this.sendMail(id, alertedAt);
        return await CoinsModel.newAlert(id, alertedAt);
    }

    async getAlerts() {
        return await CoinsModel.getAlerts();
    }

    async getAlertsByThresholds(alertId) {
        return await CoinsModel.getAlertsByThresholds(alertId);
    }

    async sendMail(id) {
        const alert = await CoinsModel.getThreshold(id);
        if (alert[0].emailNotification) {
            prepareMail(alert);
        }
        notification(alert);
    }

    async updateThreshold(id, isMailEnabled) {
        return await CoinsModel.updateThreshold(id, isMailEnabled);
    }

    async addCrypto(newCrypto) {
        return await CoinsModel.addCrypto(newCrypto);
    }

    async deleteCrypto(crypto) {
        return await CoinsModel.deleteCrypto(crypto);
    }
    
    async deleteAlertsFromThreshold(id)  {
        return await CoinsModel.deleteAlertsFromThreshold(id);
    }
}

const CoinsController = new coinsController;
export default CoinsController