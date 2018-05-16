import {fetcher} from './fetcher';
import CoinsModel from '../models/CoinsModel';
import { prepareMail, notification } from '../utils/emailUtils';
class coinsController {

    async getCoins() {
        const cryptos = await CoinsModel.getCryptos();
        const coins = await fetcher(cryptos);
        return coins
    }

    async addCrypto(newCrypto) {
        return await CoinsModel.addCrypto(newCrypto);
    }

    async deleteCrypto(crypto) {
        return await CoinsModel.deleteCrypto(crypto);
    }
}

const CoinsController = new coinsController;
export default CoinsController