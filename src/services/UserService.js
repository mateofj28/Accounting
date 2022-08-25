import axios from 'axios'
import { HeaderToken } from './HeaderToken';
axios.defaults.baseURL = 'http://accountingsystemapi.antartica.jele.site';


export class UserService {

    header = new HeaderToken()

    createUser(data) {
        return axios.post('/api/auth/registerUser', data)        
    }

    updateUser(user) {
        return axios.post('/api/company/user/update', user, this.header.getHeaderToken())        
    }

    deleteUser(id){
        return axios.get(`/api/company/user/delete/${id}`, this.header.getHeaderToken())
    }

    createCompany(company){
        return axios.post('/api/company/add', company)
    }

    createUserWithCompany(user){
        return axios.post('/api/company/user/add', user)
    }

    getUsersWithCompany(){
        return axios.get('/api/company/users/list', this.header.getHeaderToken())
    }

    login(data){
        return axios.post('/api/auth/login', data)
    }

    async checkAuth(){
        return await axios.get('/api/auth/check', this.header.getHeaderToken())
    }

    validateUser(data){
        return axios.post('/api/auth/users/validate', data)
    }

    setPassword(data){
        return axios.post('/api/auth/setPassword', data, this.header.getHeaderToken())
    }

    userAuthentication(data){
        return axios.post('/api/auth/validate', data, this.header.getHeaderToken())
    }

    companyDetails(){
        return axios.get('/api/company/details', this.header.getHeaderToken())
    }

    editCompany(data){
        return axios.post('/api/company/edit', data, this.header.getHeaderToken())
    }

    balanceSheet(){
        return axios.get('/api/company/balance', this.header.getHeaderToken())
    }

    forgotPassword(data){
        return axios.post('/api/auth/forgot', data, this.header.getHeaderToken())
    }

    validateTokenForgot(data){
        return axios.post('/api/auth/forgot/validate', data, this.header.getHeaderToken())
    }

}    