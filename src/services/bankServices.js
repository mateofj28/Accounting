import axios from 'axios'
import { HeaderToken } from './HeaderToken';

export class BankService {
    header = new HeaderToken()
    async createBank(bank) {
        return await axios.post('/api/bank/add', bank, this.header.getHeaderToken())
    }
    async getBanks(){
        return await axios.get('/api/banks', this.header.getHeaderToken())
    }
    async getBanksBalances(){
        return await axios.get('/api/banks/balances', this.header.getHeaderToken())
    }
    async updateBank(editBank){
        return await axios.post('/api/bank/edit', editBank, this.header.getHeaderToken())
    }
    async delete(id){
        return await axios.post('/api/bank/delete', id, this.header.getHeaderToken())
    }
}    