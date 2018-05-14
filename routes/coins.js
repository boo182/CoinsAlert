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

router.post('/threshold', async (req, res) => {
    const { crypto, threshold, currency } = req.body;
    const resp = await CoinsController.setThreshold(crypto, threshold, currency);
    res.json(resp);
});

router.post('/alert', async (req, res) => {
    const { id } = req.body;
    const resp = await CoinsController.newAlert(id);
    res.json(resp);
})

router.delete('/:id', async (req, res) => {
    const resp = await CoinsController.deleteThreshold(req.params.id);
    res.json(resp);
})

router.post('/threshold/update', async (req, res) => {
    console.log(req.body.id);
    const resp = await CoinsController.updateThreshold(req.body.id, req.body.isEnabled);
    res.json(resp);
})

export default router;