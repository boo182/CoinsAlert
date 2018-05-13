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
}

const CoinsModel = new coinsModel;
export default CoinsModel;
