import knex from '../db';

class coinsModel {

    async addCrypto(crypto) {
        const res = await knex('crypto')
        .insert({
            crypto
        })
        .catch(err => console.log(err));
        return await this.getCryptos();
    }

    async getCryptos() {
        const res = await knex('crypto') 
        .select()
        .catch(err => console.log(err));
        return res.map(item => item.crypto);
    }

    async deleteCrypto(crypto) {
        const res = await knex('crypto') 
        .delete()
        .where('crypto', crypto)
        .catch(err => console.log(err));
        return res;
    }
}

const CoinsModel = new coinsModel;
export default CoinsModel;
