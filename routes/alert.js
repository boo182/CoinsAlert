import express from 'express';
import AlertController from '../controllers/AlertController'


const router = express.Router();

router.get('/', async (req, res) => {
    const resp = await AlertController.getAlerts();
    res.json(resp);
})

router.get('/:alertId', async (req, res) => {
    const resp = await AlertController.getAlertsByThresholds(req.params.alertId);
    res.json(resp);
})

router.post('/', async (req, res) => {
    const { id, alertedAt } = req.body;
    const resp = await AlertController.newAlert(id, alertedAt);
    res.json(resp);
})

router.get('/sendMail/:id', async (req, res) => {
    const resp = await AlertController.sendMail(req.params.id);
    res.json(resp);
})

router.delete('/:id', async(req, res) => {
    const resp = await AlertController.deleteAlertsFromThreshold(req.params.id);
    res.json(resp);
});


export default router;