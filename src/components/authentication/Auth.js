import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../layout/Toast'
import { UserService } from '../../services/UserService';

// hola 
const Auth = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [token, setToken] = useState('')
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [passwordOne, setPasswordOne] = useState('')
    const [passwordTwo, setPasswordTwo] = useState('')
    
    const userService = new UserService()

    const onAuthentication = async(e) => {
        e.preventDefault()
        if(email.trim() === '' || token.trim() === ''){
            Toast.fire({icon:'error', title:'No dejes espacios en blanco'})
            return
        }
        const data = {
            email:email,
            token:token
        }
        const res = await userService.userAuthentication(data)
        console.log(res.data)
        if(res.status === 201){
            Toast.fire({icon:'error', title:res.data.message})
            return;
        }
        setDisplayResponsive(true)
        setToken("")
    }

    const setAuthPassword = (e) => {
        e.preventDefault()
        if(passwordOne.trim() === '' || passwordTwo.trim() === ''){
            Toast.fire({icon:'error', title:'No dejes espacios en blanco'})
            return;
        }
        if(passwordOne !== passwordTwo){
            Toast.fire({icon:'error', title:'Las contraseñas deben coincidir'})
            return;
        }
        const data = {
            email: email,
            password:passwordOne
        }
        const res = userService.setPassword(data)

        if(res.status === 201){
            Toast.fire({icon:'error', title:res.data.message})
            return;
        }

        console.log(res)
        Toast.fire({icon:'success', title:'Contraseña definida correctamente'})
        setPasswordOne("")
        setPasswordTwo("")
        setDisplayResponsive(false)
        navigate('/login')
    }


    return (
        <div className='flex align-items-center' style={{ 'height': '100vh', background: '#242629' }}>

            <Dialog header="Definir contraseña" visible={displayResponsive} onHide={() => setDisplayResponsive(false)} breakpoints={{ '960px': '75vw'}} className="w-9 lg:w-3" style={{ width: '50vw' }}>
                <InputText value={passwordOne} type="password" onChange={(e) => setPasswordOne(e.target.value)} className="w-full mt-3" placeholder='Contraseña'/>
                <InputText value={passwordTwo} type="password" onChange={(e) => setPasswordTwo(e.target.value)} className="w-full mt-3" placeholder='Validar Contraseña'/>
                <Button label="DEFINIR CONTRASEÑA" className="p-button-raised w-full mt-3" onClick={setAuthPassword} />
            </Dialog>

            <div className='col-12  flex justify-content-center mb-7'>
                <div className='surface-card shadow-6 p-6 col-8 sm:col-6 lg:col-4' style={{ borderRadius: '18px'}} >
                    <div className='flex justify-content-center'>
                        <img src="assets/images/blocks/logos/authentication.png" alt="hyper" height={100} />
                    </div>
                    <h2 style={{ color: '#fffffe'}}>Activa tu cuenta con tu correo y token.</h2>
                    <InputText value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-3 pr-3 pt-3 pb-3" placeholder='Correo' />
                    <InputText value={token} onChange={(e) => setToken(e.target.value)} className="w-full mt-3 pr-3 pt-3 pb-3" placeholder='Token' />
                    <Button label="CONTINUAR" className="p-button-raised w-full mt-3 p-3" onClick={onAuthentication} />
                    <Button label="REGRESAR" className="p-button-raised w-full mt-3 p-3 " onClick={() => navigate('../login', {replace: true})} style={{ background: '#f45d48', border: '#f45d48'}}/>
                </div>
            </div>
        </div>
    )
}

export default Auth