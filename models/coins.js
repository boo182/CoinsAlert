import knex from '../db';

class coinsModel {

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
        return res;
    }

    async getAlerts() {
        const res = await knex('alerts') 
        .select('alertId')
        .sum('alert as alerts')
        .groupBy('alertId')
        .catch(err => console.log(err));
        return res;
    }

    async newAlert(alertId) {
        const res = await knex('alerts')
        .insert({
            alertId,
            alert: 1,
        })
        .catch(err => console.log(err));
        return this.getAlerts(alertId);
    }

    async updateThreshold(alertId, isEmailEnabled) {
        const res = await knex('threshold')
        .update('emailNotification', isEmailEnabled)
        .where('id', alertId)
        .catch(err => console.log(err))
        return res;
    }
}

const CoinsModel = new coinsModel;
export default CoinsModel;
