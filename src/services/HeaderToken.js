export class HeaderToken {

    getHeaderToken() {
        return { headers: { 'Authorization': `Basic ${sessionStorage.getItem('token')}` }}
    }
}