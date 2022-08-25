import axios from 'axios'
import { HeaderToken } from './HeaderToken';

export class ChartsService {

    header = new HeaderToken()

    async getIncomeVsExpenses() {
        return await axios.get('/api/stats/balances', this.header.getHeaderToken())
    }

    async getExpenseCategory() {
        return await axios.get('/api/stats/category/expenses', this.header.getHeaderToken())
    }

}