import {fetcher} from './fetcher';
import ThresholdModel from '../models/ThresholdModel';
import { prepareMail, notification } from '../utils/emailUtils';

class thresholdController {

    async setThreshold(crypto, threshold, currency) {
        const res = await ThresholdModel.setThreshold(crypto, threshold, currency);
        return res;
    }

    async getThresholds() {
        const res = await ThresholdModel.getThresholds();
        return res;
    }

    async deleteThreshold(id) {
        return await ThresholdModel.deleteThreshold(id);
    }

    async updateThreshold(id, isMailEnabled) {
        return await ThresholdModel.updateThreshold(id, isMailEnabled);
    }

    async sendMail(id) {
        const alert = await ThresholdModel.getThreshold(id);
        if (alert[0].emailNotification) {
            prepareMail(alert);
        }
        notification(alert);
    }

}

const ThresholdController = new thresholdController;
export default ThresholdController