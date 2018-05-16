import express from 'express';
import CoinsController from '../controllers/CoinsController'


const router = express.Router();

router.get('/', async (req, res) => {
    const coins = await CoinsController.getCoins();
    res.json(coins);
});

router.post('/add', async(req, res) => {
    const resp = await CoinsController.addCrypto(req.body.newCrypto);
    res.json(resp);
})

router.delete('/:crypto', async(req, res) => {
    const resp = await CoinsController.deleteCrypto(req.params.crypto);
    res.json(resp);
});



export default router;