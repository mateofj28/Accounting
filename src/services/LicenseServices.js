import { HeaderToken } from './HeaderToken';
import axios from 'axios'

export class License {
    header = new HeaderToken()

    createLicense(License) {
        return axios.post('api/license/add', License)        
    }

    getLicenseDetail(){
        return axios.get('/api/license/details', this.header.getHeaderToken())
    }
}

export default License