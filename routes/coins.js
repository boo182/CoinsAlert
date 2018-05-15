import express from 'express';
import CoinsController from '../controllers/CoinsController'


const router = express.Router();

router.get('/', async (req, res) => {
    const coins = await CoinsController.getCoins();
    res.json(coins);
});

router.get('/thresholds', async (req, res) => {
    const resp = await CoinsController.getThresholds();
    res.json(resp);
})

router.get('/sendMail/:id', async (req, res) => {
    const resp = await CoinsController.sendMail(req.params.id);
    res.json(resp);
})

router.get('/getAlerts', async (req, res) => {
    const resp = await CoinsController.getAlerts();
    res.json(resp);
})

router.get('/alerts/:alertId', async (req, res) => {
    const resp = await CoinsController.getAlertsByThresholds(req.params.alertId);
    res.json(resp);
})

router.post('/threshold', async (req, res) => {
    const { crypto, threshold, currency } = req.body;
    const resp = await CoinsController.setThreshold(crypto, threshold, currency);
    res.json(resp);
});

router.post('/alert', async (req, res) => {
    const { id, alertedAt } = req.body;
    const resp = await CoinsController.newAlert(id, alertedAt);
    res.json(resp);
})

router.delete('/:id', async (req, res) => {
    const resp = await CoinsController.deleteThreshold(req.params.id);
    res.json(resp);
})

router.post('/threshold/update', async (req, res) => {
    const resp = await CoinsController.updateThreshold(req.body.id, req.body.isEnabled);
    res.json(resp);
})

router.post('/add/crypto', async(req, res) => {
    const resp = await CoinsController.addCrypto(req.body.newCrypto);
    res.json(resp);
})

router.delete('/delete/crypto/:crypto', async(req, res) => {
    const resp = await CoinsController.deleteCrypto(req.params.crypto);
    res.json(resp);
});

router.delete('/delete/alerts/:id', async(req, res) => {
    const resp = await CoinsController.deleteAlertsFromThreshold(req.params.id);
    res.json(resp);
});

export default router;