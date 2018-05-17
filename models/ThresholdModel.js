import knex from '../db';
import AlertModel from './AlertModel';

class thresholdModel {

    async setThreshold(crypto, threshold, currency) {
        const res = await knex('threshold')
        .insert({
            crypto,
            threshold,
            currency,
        })
        .catch(err => console.log(err));
        return res;
    }
    async getThreshold(id) {
        const res = await knex('threshold')
        .select()
        .where('id', id)
        .catch(err => console.log(err))
        return res;
    }

    async getThresholds() {
        const res = await knex('threshold')
        .select()
        .catch(err => console.log(err));
        return res;
    }

    async deleteThreshold(id) {
        const res = await knex('threshold')
        .delete()
        .where('id', id)
        .catch(err => console.log(err));
        AlertModel.deleteAlerts(id);
        return res;
    }

    async updateThreshold(alertId, isEmailEnabled) {
        const res = await knex('threshold')
        .update('emailNotification', isEmailEnabled)
        .where('id', alertId)
        .catch(err => console.log(err))
        return res;
    }
}

const ThresholdModel = new thresholdModel;
export default ThresholdModel;