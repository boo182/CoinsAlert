import knex from '../db';

class alertModel {
    deleteAlerts(id) {
        const res = knex('alerts')
        .delete()
        .where('alertId', id)
        .catch(err => console.log(err));
        return res
    }

    async getAlerts() {
        const res = await knex('alerts') 
        .select('alertId')
        .sum('alert as alerts')
        .groupBy('alertId')
        .catch(err => console.log(err));
        return res;
    }

    async getAlertsByThresholds(alertId) {
        const res = await knex('alerts')
        .select()
        .where('alertId', alertId)
        .catch(err => console.log(err));
        return res;
    }

    async newAlert(alertId, alertedAt) {
        const res = await knex('alerts')
        .insert({
            alertId,
            alert: 1,
            alertedAt,
            createdAt: new Date(),
        })
        .catch(err => console.log(err));
        return this.getAlerts(alertId);
    }


    async deleteAlertsFromThreshold(id) {
        const res = await knex('alerts') 
        .delete()
        .where('alertId', id)
        .catch(err => console.log(err));
        return res;
    }
}

const AlertModel = new alertModel;
export default AlertModel;