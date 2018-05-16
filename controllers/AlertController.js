import AlertModel from '../models/AlertModel';
import ThresholdController from './ThresholdController';

class alertController {

    async newAlert(id, alertedAt) {
        ThresholdController.sendMail(id, alertedAt);
        return await AlertModel.newAlert(id, alertedAt);
    }

    async getAlerts() {
        return await AlertModel.getAlerts();
    }

    async getAlertsByThresholds(alertId) {
        return await AlertModel.getAlertsByThresholds(alertId);
    }

    async deleteAlertsFromThreshold(id)  {
        return await AlertModel.deleteAlertsFromThreshold(id);
    }

}

const AlertController = new alertController;
export default AlertController
