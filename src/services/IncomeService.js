import axios from 'axios'
import { HeaderToken } from './HeaderToken';

export class IncomeService {

    header = new HeaderToken()

    createIncome(Income) {
        return axios.post('/api/income/add', Income, this.header.getHeaderToken())        
    }

    updateIncome(income) {
        return axios.post('/api/income/edit', income, this.header.getHeaderToken())        
    }

    async listIncome(){
        return await axios.get('/api/incomes/list', this.header.getHeaderToken())
    }

    getIncomeById(id){
        return axios.get(`/api/income/get/${id}`, this.header.getHeaderToken())
    }

    //Esta api pues no se, sin embargo no la elimino para no tener problemas o algo. PSDT: Ya estaba creada
    // listIncomeRecurrent(){
    //     return axios.post('/api/company/user/add', this.header.getHeaderToken())
    // }

    listIncomeRecurrent(){
        return axios.get('/api/incomes/list/recurrent', this.header.getHeaderToken())
    }
    
    async listDueIncome(){
        return await axios.get('/api/incomes/list/due', this.header.getHeaderToken())
    }

}    