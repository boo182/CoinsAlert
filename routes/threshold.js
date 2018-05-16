import express from 'express';
import ThresholdController from '../controllers/ThresholdController';

const router = express.Router();
router.get('/', async (req, res) => {
    const resp = await ThresholdController.getThresholds();
    res.json(resp);
})

router.post('/', async (req, res) => {
    const { crypto, threshold, currency } = req.body;
    const resp = await ThresholdController.setThreshold(crypto, threshold, currency);
    res.json(resp);
});

router.delete('/:id', async (req, res) => {
    const resp = await ThresholdController.deleteThreshold(req.params.id);
    res.json(resp);
})

router.put('/', async (req, res) => {
    const resp = await ThresholdController.updateThreshold(req.body.id, req.body.isEnabled);
    res.json(resp);
})

export default router;
