import express from 'express';
import CoinsController from '../controllers/CoinsController'


const router = express.Router();

router.get('/', async (req, res) => {
    const coins = await CoinsController.getCoins();
    res.json(coins);
});

router.get('/thresholds', async (req, res) => {
    const resp = await CoinsController.getThresholds();
    console.log(resp);
    res.json(resp);
})

router.post('/threshold', async (req, res) => {
    const { crypto, threshold, currency } = req.body;
    console.log(threshold);
    const resp = await CoinsController.setThreshold(crypto, threshold, currency);
    res.json(resp);
});

export default router;