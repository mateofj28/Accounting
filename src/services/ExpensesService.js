import axios from 'axios'
import { HeaderToken } from './HeaderToken';

export class ExpensesService {

    header = new HeaderToken()

    createExpenses(Expenses) {
        return axios.post('/api/expense/add', Expenses, this.header.getHeaderToken())        
    }

    updateExpenses(EditExpenses) {
        return axios.post('/api/expense/edit', EditExpenses, this.header.getHeaderToken())        
    }

    listExpenses(){
        return axios.get('/api/expenses/list', this.header.getHeaderToken())
    }

    getExpensesById(id){
        return axios.get(`/api/expense/get/${id}`, this.header.getHeaderToken())
    }

    listExpensesRecurrent(){
        return axios.get('/api/expenses/list/recurrent', this.header.getHeaderToken())
    }

    async listDueExpenses(){
        return await axios.get('/api/expenses/list/due', this.header.getHeaderToken())
    }
}    